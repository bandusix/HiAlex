# Contributing to HiAlex

Thank you for your interest in contributing to HiAlex! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Platform and version information
   - Screenshots if applicable

### Suggesting Features

1. Check if the feature has been suggested
2. Create an issue with:
   - Clear use case
   - Expected behavior
   - Mockups or examples if applicable

### Contributing Code

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/hialex.git
   cd hialex
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments where needed
   - Update documentation

4. **Test your changes**
   ```bash
   npm run dev
   # Test on your platform
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: brief description of changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Describe what changed and why
   - Reference related issues
   - Include screenshots for UI changes

## Development Guidelines

### Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

### Project Structure

- `installer/` - Main application code
- `scripts/` - Build and utility scripts
- `docs/` - Documentation
- `resources/` - Bundled installers and assets

### Testing

Before submitting:
- Test installation flow completely
- Test on target platform (Windows/macOS)
- Verify configuration saves correctly
- Check for console errors

### Documentation

Update documentation when:
- Adding new features
- Changing installation process
- Modifying configuration options
- Changing project structure

## Pull Request Process

1. Update README.md with any new dependencies or setup steps
2. Update docs/ with any feature changes
3. Ensure the build passes
4. Request review from maintainers
5. Address any feedback
6. Squash commits if requested
7. Wait for approval and merge

## Release Process

Maintainers will:
1. Review and merge PRs
2. Update version numbers
3. Build installers for all platforms
4. Test release candidates
5. Create GitHub release
6. Update documentation

## Getting Help

- Read the [Development Guide](docs/DEVELOPMENT.md)
- Check existing [Issues](https://github.com/yourusername/hialex/issues)
- Ask questions in discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for helping make HiAlex better!
