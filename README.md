# HiAlex

An all-in-one GUI installer for Paseo and Claude CLI on Windows and macOS.

## Features

- 🚀 One-click installation of Paseo and Claude CLI
- 🎨 Beautiful GUI installation wizard
- ⚙️ Interactive configuration for BASE URL and AUTH TOKEN
- 💾 Offline installation support
- 🖥️ Cross-platform: Windows and macOS

## What's Included

- **Paseo**: Multi-agent orchestration platform for AI coding assistants
- **Claude CLI**: Command-line interface for Claude Code
- **Configuration Wizard**: GUI-based setup for authentication and endpoints

## Installation

Download the installer for your platform:
- Windows: `HiAlex-Setup-{version}.exe`
- macOS: `HiAlex-{version}.dmg`

Run the installer and follow the GUI wizard to configure your environment.

## Development

This project is based on [Paseo](https://github.com/getpaseo/paseo) with enhanced installation capabilities.

### Project Structure

```
HiAlex/
├── installer/          # GUI installer application (Electron)
├── resources/          # Bundled installers (Claude CLI, Paseo)
├── scripts/            # Build and packaging scripts
└── docs/              # Documentation
```

### Building from Source

```bash
# Install dependencies
npm install

# Build installer
npm run build

# Package for distribution
npm run package:win   # Windows
npm run package:mac   # macOS
```

## Architecture

HiAlex provides a unified installation experience by:

1. **Bundling**: Includes Claude CLI and Paseo installers
2. **Automation**: Installs both tools sequentially
3. **Configuration**: GUI wizard for setting up authentication
4. **Verification**: Tests configuration before completing

## License

Open source - see LICENSE file for details

## Acknowledgments

Built on top of [Paseo](https://github.com/getpaseo/paseo) by the Paseo team.
