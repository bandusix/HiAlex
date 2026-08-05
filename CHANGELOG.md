# Changelog

All notable changes to HiAlex will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of HiAlex installer
- GUI-based installation wizard
- Automatic Claude CLI installation
- Automatic Paseo installation
- Configuration wizard for Claude CLI
- Support for Windows and macOS
- Offline installation capability
- Installation progress tracking
- Connection testing for Claude CLI
- Automatic PATH configuration

### Features
- Component selection (install Claude CLI, Paseo, or both)
- Custom installation directory
- Interactive configuration screens
- Beautiful gradient-based UI
- Installation status checking
- Skip configuration option

## [0.1.0] - 2026-08-05

### Added
- Initial project structure
- Electron-based installer application
- Installation manager with platform detection
- Configuration management for Claude CLI
- Build scripts for Windows and macOS
- Documentation (README, USER_GUIDE, DEVELOPMENT)
- GitHub Actions workflow for automated builds
- MIT License
- Contributing guidelines

### Technical Details
- Electron 28.x for cross-platform GUI
- Node.js-based installation logic
- IPC communication between main and renderer
- electron-builder for packaging
- Support for bundled installers

---

## Release Notes Template

When releasing a new version, copy this template:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing functionality

### Deprecated
- Features that will be removed

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```
