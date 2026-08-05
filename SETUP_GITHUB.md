# Setup GitHub Repository

## Using GitHub CLI (Recommended)

```bash
# Create a new repository on GitHub
gh repo create HiAlex --public --source=. --description="GUI installer for Paseo and Claude CLI - One-click setup for Windows and macOS"

# Push to GitHub
git push -u origin main
```

## Using GitHub Web Interface

1. **Create Repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `HiAlex`
   - Description: `GUI installer for Paseo and Claude CLI - One-click setup for Windows and macOS`
   - Choose: Public
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

2. **Add Remote and Push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/HiAlex.git
   git push -u origin main
   ```

## After Pushing

### Update README with Your Repository URL

Replace `yourusername` in the following files:
- `README.md`
- `docs/USER_GUIDE.md`
- `docs/DEVELOPMENT.md`
- `CONTRIBUTING.md`
- `QUICKSTART.md`

### Configure GitHub Settings

1. **Enable GitHub Actions**: 
   - Go to repository Settings → Actions → General
   - Allow all actions and reusable workflows

2. **Add Topics** (for discoverability):
   - `electron`
   - `installer`
   - `paseo`
   - `claude`
   - `gui`
   - `windows`
   - `macos`
   - `ai-tools`

3. **Set Up Branch Protection** (optional):
   - Settings → Branches → Add rule
   - Branch name pattern: `main`
   - Require pull request reviews

### Create First Release

When ready to release:

```bash
# Tag the release
git tag -a v0.1.0 -m "Initial release of HiAlex"
git push origin v0.1.0
```

GitHub Actions will automatically build installers for Windows and macOS.

## Next Steps

1. Build the project locally to test
2. Add actual installer files to `resources/`
3. Test installation flow
4. Create release with built installers
