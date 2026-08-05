# User Guide

## Installing HiAlex

### Download

Visit [HiAlex Releases](https://github.com/yourusername/hialex/releases) and download the installer for your platform:

- **Windows**: `HiAlex-Setup-{version}.exe`
- **macOS**: `HiAlex-{version}.dmg`

### Installation Steps

#### Windows

1. Double-click `HiAlex-Setup-{version}.exe`
2. If prompted by Windows Defender, click "More info" then "Run anyway"
3. Follow the installation wizard
4. Choose components to install (Claude CLI and/or Paseo)
5. Select installation directory
6. Wait for installation to complete
7. Configure Claude CLI with your credentials
8. Click "Finish"

#### macOS

1. Open `HiAlex-{version}.dmg`
2. Drag HiAlex to Applications folder
3. Right-click and select "Open" (first time only)
4. Follow the installation wizard
5. Choose components to install
6. Enter your password when prompted (for system installation)
7. Configure Claude CLI credentials
8. Click "Finish"

## Configuration

### Claude CLI Setup

During installation, you'll be prompted to configure Claude CLI:

1. **Base URL**: The API endpoint
   - Default: `https://api.anthropic.com`
   - For custom deployments, enter your endpoint URL

2. **Auth Token**: Your authentication token
   - Get this from your Anthropic account
   - Or from your organization's admin

3. **Test Connection**: Click to verify your credentials

You can skip this step and configure later by editing:
- Windows: `%APPDATA%\claude\config.json`
- macOS: `~/.claude/config.json`

### Paseo Configuration

Paseo will be configured automatically. On first launch:

```bash
# Start Paseo daemon
paseo

# Or use the desktop app
# Find "Paseo" in your applications
```

## Using HiAlex

### After Installation

Once installed, you'll have access to:

1. **Claude CLI**: Command-line interface for Claude Code
   ```bash
   claude --help
   claude "Write a hello world in Python"
   ```

2. **Paseo CLI**: Multi-agent orchestration
   ```bash
   paseo --help
   paseo start
   ```

3. **Paseo Desktop**: GUI application for managing agents

### Verifying Installation

Open a new terminal and run:

```bash
# Check Claude CLI
claude --version

# Check Paseo
paseo --version
```

If commands are not found, you may need to restart your terminal or add them to PATH manually.

## Updating

To update HiAlex:

1. Download the latest installer
2. Run it (will detect existing installation)
3. Choose "Update" or "Reinstall"

## Uninstalling

### Windows

1. Open "Add or Remove Programs"
2. Find "HiAlex"
3. Click "Uninstall"
4. Follow the prompts

### macOS

1. Open Applications folder
2. Drag HiAlex to Trash
3. Empty Trash
4. Remove CLI tools:
   ```bash
   npm uninstall -g @anthropic-ai/claude-cli
   npm uninstall -g @getpaseo/cli
   ```

## Troubleshooting

### Installation Issues

**Problem**: "Installation failed"
- **Solution**: Run as administrator (Windows) or with sudo (macOS)
- **Solution**: Check disk space (requires ~500MB)
- **Solution**: Temporarily disable antivirus

**Problem**: "Component already installed"
- **Solution**: This is normal - installer will skip existing components
- **Solution**: Uninstall existing version first for clean install

### Configuration Issues

**Problem**: "Invalid credentials"
- **Solution**: Verify your auth token is correct
- **Solution**: Check base URL format (must include https://)
- **Solution**: Test connection before saving

**Problem**: "Cannot save configuration"
- **Solution**: Run installer as administrator
- **Solution**: Check file permissions in config directory

### Runtime Issues

**Problem**: "Command not found"
- **Solution**: Restart terminal after installation
- **Solution**: Manually add to PATH:
  - Windows: Add `C:\Program Files\HiAlex\bin` to PATH
  - macOS: Add `~/Applications/HiAlex/bin` to PATH

**Problem**: "Paseo won't start"
- **Solution**: Check that Node.js is installed
- **Solution**: Run `paseo --help` to see error details
- **Solution**: Try reinstalling Paseo component

## Getting Help

- Documentation: [docs/](../docs/)
- Issues: [GitHub Issues](https://github.com/yourusername/hialex/issues)
- Paseo Docs: [paseo.sh](https://paseo.sh)
- Claude Docs: [anthropic.com](https://anthropic.com)

## FAQ

**Q: Do I need both components?**
A: No, you can install just Claude CLI or just Paseo if preferred.

**Q: Is internet required?**
A: Only for downloading the installer. Once downloaded, installation works offline.

**Q: Can I install for multiple users?**
A: Windows: Yes, choose "All Users" during installation
A: macOS: Each user needs to run installer separately

**Q: How do I update just one component?**
A: Run installer again and select only the component to update.

**Q: Where are the logs?**
A: Installation logs are in:
- Windows: `%TEMP%\hialex-install.log`
- macOS: `/tmp/hialex-install.log`
