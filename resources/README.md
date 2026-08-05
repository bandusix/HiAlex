# Resources Directory

This directory should contain the bundled installers for offline installation.

## Required Files for Full Offline Installation

### Claude CLI Installers
- **Windows**: `claude-cli-setup.exe`
- **macOS**: `claude-cli.pkg`

### Paseo Installers (Optional)
- **Windows**: `paseo-setup.exe`
- **macOS**: `paseo.dmg`

If Paseo installers are not provided, HiAlex will automatically install via npm.

## Assets

### Logo and Icons
- `logo.svg` - HiAlex logo (✅ included)
- `icon.ico` - Windows application icon (todo)
- `icon.icns` - macOS application icon (todo)

## How to Obtain Installers

### Claude CLI
Contact Anthropic or your organization's admin for Claude CLI installers.

### Paseo
Download from the official repository:
```bash
# Visit releases page
https://github.com/getpaseo/paseo/releases

# Or use curl/wget to download latest
```

### Creating Icons from Logo

Use ImageMagick or online converters:

```bash
# Create PNG from SVG
magick convert logo.svg -resize 512x512 logo.png

# Create ICO for Windows
magick convert logo.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico

# Create ICNS for macOS (requires iconutil on macOS)
mkdir icon.iconset
sips -z 16 16     logo.png --out icon.iconset/icon_16x16.png
sips -z 32 32     logo.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     logo.png --out icon.iconset/icon_32x32.png
sips -z 64 64     logo.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   logo.png --out icon.iconset/icon_128x128.png
sips -z 256 256   logo.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   logo.png --out icon.iconset/icon_256x256.png
sips -z 512 512   logo.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   logo.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 logo.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
```

## Directory Structure

```
resources/
├── README.md           # This file
├── logo.svg           # ✅ HiAlex logo
├── logo.png           # (generate from SVG)
├── icon.ico           # (generate for Windows)
├── icon.icns          # (generate for macOS)
├── claude-cli-setup.exe   # (add for Windows offline install)
├── claude-cli.pkg         # (add for macOS offline install)
├── paseo-setup.exe        # (optional - adds offline Paseo for Windows)
└── paseo.dmg              # (optional - adds offline Paseo for macOS)
```

## Security Notes

⚠️ **Important**: 
- Only use official installers from trusted sources
- Verify checksums before bundling
- Keep installers up to date
- Do not commit large binary files to git (use .gitignore)

## Building Without Bundled Installers

HiAlex can still be built and used without bundled installers:
- Claude CLI will need to be installed separately by users
- Paseo will be installed via npm automatically
- Users will be prompted to install missing components

This approach reduces installer size but requires internet connection.
