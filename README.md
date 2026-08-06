# HiAlex

**Paseo + Claude CLI in one app** - No installation needed, just download and run!

## Features

- 🚀 **Portable Application** - Download, extract, and run immediately
- 🎨 Beautiful integrated GUI for Paseo
- 🤖 Claude CLI built-in and pre-configured
- ⚙️ Simple API key configuration
- 💾 No system installation required
- 🖥️ Cross-platform: Windows and macOS

## Quick Start

1. **Download** HiAlex for your platform
2. **Extract** the archive
3. **Run** HiAlex.exe (Windows) or HiAlex.app (macOS)
4. **Configure** your Anthropic API key
5. **Start coding** with AI assistance!

## What is HiAlex?

HiAlex is a **standalone desktop application** that combines:
- **Paseo** - Multi-agent AI orchestration
- **Claude CLI** - Anthropic's coding assistant
- **Integrated UI** - Seamless experience in one app

No separate installations, no command-line setup, no npm required!

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
