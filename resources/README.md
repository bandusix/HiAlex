# This directory contains bundled installers and resources

## Required Files

To build HiAlex, place the following files here:

### Claude CLI
- `claude-cli-setup.exe` - Windows installer
- `claude-cli.pkg` - macOS installer package

### Paseo
- `paseo-setup.exe` - Windows installer (optional, will use npm if not present)
- `paseo.dmg` - macOS disk image (optional, will use npm if not present)

### Assets
- `logo.png` - HiAlex logo (400x400px recommended)
- `icon.ico` - Windows icon (256x256px)
- `icon.icns` - macOS icon bundle

## Obtaining Installers

### Claude CLI
Visit the official Anthropic website or contact support for CLI installers.

### Paseo
Download from: https://github.com/getpaseo/paseo/releases

### Creating Icons
Use tools like:
- ImageMagick: `convert logo.png -resize 256x256 icon.png`
- Online converters for ICO/ICNS formats

## Notes

- Files in this directory are not tracked by git (see .gitignore)
- Installers should be obtained from official sources only
- Verify checksums before bundling
