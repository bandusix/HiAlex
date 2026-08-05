# HiAlex Quick Start Guide

## For End Users

### Installation

1. **Download** the installer for your platform:
   - Windows: `HiAlex-Setup-{version}.exe`
   - macOS: `HiAlex-{version}.dmg`

2. **Run** the installer

3. **Follow** the wizard:
   - Choose installation directory (optional)
   - Configure Claude CLI API credentials
   - Complete installation

4. **Start using**:
   ```bash
   # Start Paseo (Claude CLI is integrated)
   paseo
   
   # Or launch Paseo desktop app
   ```
   
   Claude CLI is automatically configured as Paseo's default provider!

## For Developers

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/hialex.git
cd hialex

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Project Structure

```
HiAlex/
├── installer/          # Main application code
│   ├── main.js        # Electron main process
│   ├── preload.js     # Secure IPC bridge
│   ├── installation-manager.js  # Core logic
│   └── renderer/      # GUI interface
├── resources/         # Bundled installers (add these)
├── scripts/           # Build scripts
└── docs/             # Documentation
```

### Building

1. **Prepare resources** (optional - will use npm fallback):
   ```bash
   # Add to resources/ directory:
   # - claude-cli-setup.exe (Windows)
   # - claude-cli.pkg (macOS)
   # - paseo-setup.exe (Windows)
   # - paseo.dmg (macOS)
   ```

2. **Build installer**:
   ```bash
   # Windows
   npm run package:win
   
   # macOS
   npm run package:mac
   ```

3. **Find output** in `dist/` directory

### Testing

```bash
# Run with DevTools open
npm run dev

# Test installation flow
# (Use dry-run mode to avoid actual installation)
```

## Key Features

✅ **One-Click Installation**: Install both tools at once  
✅ **GUI Wizard**: Beautiful, easy-to-use interface  
✅ **Configuration Helper**: Set up authentication easily  
✅ **Offline Support**: Works without internet (if installers bundled)  
✅ **Cross-Platform**: Windows and macOS support  
✅ **Smart Detection**: Skips already-installed components  

## Configuration

### Claude CLI Setup

The installer will prompt for:
- **Base URL**: API endpoint (default: `https://api.anthropic.com`)
- **Auth Token**: Your authentication token

Saved to:
- Windows: `%APPDATA%\claude\config.json`
- macOS: `~/.claude/config.json`

### Manual Configuration

Edit the config file directly if needed:

```json
{
  "baseUrl": "https://api.anthropic.com",
  "authToken": "your-token-here",
  "configuredAt": "2026-08-05T12:00:00.000Z"
}
```

## Troubleshooting

### "Command not found" after installation
**Solution**: Restart your terminal or manually add to PATH

### Installation fails
**Solution**: 
- Run as administrator (Windows) or with sudo (macOS)
- Check disk space (~500MB required)
- Temporarily disable antivirus

### Configuration won't save
**Solution**:
- Check file permissions
- Run installer as administrator
- Verify config directory exists

## Next Steps

1. **Read the docs**:
   - [User Guide](docs/USER_GUIDE.md)
   - [Development Guide](docs/DEVELOPMENT.md)

2. **Explore features**:
   ```bash
   # Claude CLI
   claude --help
   claude "Write a hello world program"
   
   # Paseo
   paseo --help
   paseo start
   ```

3. **Contribute**: See [CONTRIBUTING.md](CONTRIBUTING.md)

4. **Report issues**: [GitHub Issues](https://github.com/yourusername/hialex/issues)

## Architecture Overview

```
┌─────────────────────────────────────┐
│      HiAlex GUI Installer           │
│  (Electron + Node.js)               │
└──────────┬──────────────────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌─────────┐  ┌──────────┐
│ Claude  │  │  Paseo   │
│  CLI    │  │          │
└─────────┘  └──────────┘
    │             │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │    User     │
    │ Development │
    │ Environment │
    └─────────────┘
```

## Resources

- **Paseo**: https://github.com/getpaseo/paseo
- **Claude**: https://www.anthropic.com/claude
- **HiAlex Docs**: [docs/](docs/)

## License

MIT License - see [LICENSE](LICENSE)

---

**Happy coding with HiAlex! 🚀**
