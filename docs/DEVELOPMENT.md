# HiAlex Development Guide

## Project Overview

HiAlex is a GUI installer that simplifies the setup of Paseo and Claude CLI for developers. It provides a unified installation experience with automatic configuration.

## Architecture

```
HiAlex/
├── installer/                    # Main Electron application
│   ├── main.js                  # Electron main process
│   ├── preload.js              # Secure bridge to renderer
│   ├── installation-manager.js # Installation logic
│   └── renderer/               # GUI interface
│       ├── index.html
│       ├── styles.css
│       └── app.js
├── resources/                   # Bundled installers
│   ├── claude-cli-setup.exe   # Windows Claude CLI
│   ├── claude-cli.pkg         # macOS Claude CLI
│   ├── paseo-setup.exe        # Windows Paseo
│   ├── paseo.dmg              # macOS Paseo
│   └── logo.png               # App logo
├── scripts/                     # Build scripts
└── docs/                       # Documentation
```

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Platform-specific build tools:
  - **Windows**: Visual Studio Build Tools
  - **macOS**: Xcode Command Line Tools

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/hialex.git
cd hialex

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## Building

### Prepare Resources

Place the following installers in the `resources/` directory:

1. **Claude CLI**:
   - Windows: `claude-cli-setup.exe`
   - macOS: `claude-cli.pkg`

2. **Paseo**:
   - Windows: `paseo-setup.exe`
   - macOS: `paseo.dmg`

You can download these from their respective projects or build them yourself.

### Build for Your Platform

```bash
# Windows
npm run package:win

# macOS
npm run package:mac

# Both platforms (requires cross-compilation setup)
npm run package:all
```

Installers will be created in the `dist/` directory.

## Installation Flow

1. **Welcome Screen**: Introduction and overview
2. **Installation Screen**: Select components and directory
3. **Progress**: Visual feedback during installation
4. **Configuration Screen**: Set up Claude CLI credentials
5. **Complete**: Success message and next steps

## Installation Manager

The `InstallationManager` class handles:

- **Component Detection**: Checks if Claude CLI or Paseo are already installed
- **Installation**: Runs platform-specific installers
- **Configuration**: Saves Claude CLI settings
- **Environment Setup**: Adds tools to system PATH

### Key Methods

```javascript
// Check what's already installed
const status = await installManager.checkInstallationStatus();

// Install components
await installManager.install({
  installDir: '/path/to/install',
  claudeCLI: true,
  paseo: true
});

// Save configuration
await installManager.saveConfiguration({
  baseUrl: 'https://api.anthropic.com',
  authToken: 'your-token'
});

// Test configuration
const result = await installManager.testConfiguration(config);
```

## GUI Components

The installer UI is built with vanilla JavaScript and CSS. Key screens:

- `screen-welcome`: Landing page
- `screen-installation`: Component selection and progress
- `screen-configuration`: Claude CLI setup
- `screen-complete`: Success and next steps

### IPC Communication

Renderer <-> Main process communication uses Electron IPC:

```javascript
// From renderer (app.js)
const result = await window.hialex.startInstallation(options);

// Handled in main (main.js)
ipcMain.handle('start-installation', async (event, options) => {
  // Installation logic
});
```

## Configuration

### Claude CLI Configuration

Stored at:
- **Windows**: `%APPDATA%\claude\config.json`
- **macOS**: `~/.claude/config.json`

Format:
```json
{
  "baseUrl": "https://api.anthropic.com",
  "authToken": "your-token",
  "configuredAt": "2026-08-05T12:00:00.000Z"
}
```

### Paseo Configuration

Paseo manages its own configuration. HiAlex ensures it's installed and accessible.

## Platform-Specific Notes

### Windows

- Uses NSIS for installer creation
- Requires administrator privileges for system-wide installation
- Adds to system PATH via registry or batch scripts

### macOS

- Uses DMG for distribution
- May require user approval for installation
- Updates shell profiles (.profile, .zshrc) for PATH

## Testing

```bash
# Run in development with DevTools
npm run dev

# Test installation flow (without actually installing)
# Set HIALEX_DRY_RUN=1 environment variable
```

## Troubleshooting

### Installation Fails

- Check that resource files are present
- Verify disk space
- Run with administrator/sudo privileges
- Check logs in console (dev mode)

### Configuration Not Saved

- Verify file permissions
- Check that config directory exists
- Test with manual config file creation

### PATH Not Updated

- Restart terminal after installation
- Manually add to PATH if needed
- Check shell profile files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on target platforms
5. Submit a pull request

## Release Process

1. Update version in `package.json`
2. Build for all platforms
3. Test installers
4. Create GitHub release
5. Upload installers as release assets
6. Update documentation

## License

Open source - see LICENSE file for details.

## Related Projects

- [Paseo](https://github.com/getpaseo/paseo) - Multi-agent orchestration
- [Claude CLI](https://www.anthropic.com/claude) - Anthropic's CLI tool
