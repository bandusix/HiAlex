#!/bin/bash

# HiAlex Build Script
# This script prepares resources and builds the installer

set -e

echo "Building HiAlex Installer..."

# Create resources directory
mkdir -p resources

# Download Claude CLI installers (if not already present)
echo "Checking for Claude CLI resources..."
if [ ! -f "resources/claude-cli-setup.exe" ] && [ "$1" != "--skip-download" ]; then
  echo "Note: Add Claude CLI installers to resources/ directory:"
  echo "  - resources/claude-cli-setup.exe (Windows)"
  echo "  - resources/claude-cli.pkg (macOS)"
fi

# Download Paseo installers from GitHub releases
echo "Checking for Paseo resources..."
PASEO_VERSION="latest"

if [ ! -f "resources/paseo-setup.exe" ] && [ "$OSTYPE" == "msys" ]; then
  echo "Downloading Paseo for Windows..."
  # Add download logic here when ready
fi

if [ ! -f "resources/paseo.dmg" ] && [ "$OSTYPE" == "darwin"* ]; then
  echo "Downloading Paseo for macOS..."
  # Add download logic here when ready
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the installer package
echo "Building installer..."
if [ "$OSTYPE" == "msys" ] || [ "$OSTYPE" == "win32" ]; then
  npm run package:win
elif [ "$OSTYPE" == "darwin"* ]; then
  npm run package:mac
else
  echo "Unsupported platform: $OSTYPE"
  exit 1
fi

echo "Build complete! Check the dist/ directory for installers."
