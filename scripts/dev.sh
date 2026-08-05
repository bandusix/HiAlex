#!/bin/bash

# Quick development script for HiAlex

echo "HiAlex Development Helper"
echo "========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Check for resources
echo "Checking resources..."
if [ ! -f "resources/logo.svg" ]; then
    echo "Warning: resources/logo.svg not found"
fi

if [ ! -f "resources/claude-cli-setup.exe" ] && [ ! -f "resources/claude-cli.pkg" ]; then
    echo "Note: Claude CLI installers not found in resources/"
    echo "  Add them to test full installation flow"
fi

if [ ! -f "resources/paseo-setup.exe" ] && [ ! -f "resources/paseo.dmg" ]; then
    echo "Note: Paseo installers not found in resources/"
    echo "  Installer will fall back to npm installation"
fi

echo ""
echo "Starting HiAlex in development mode..."
echo "Press Ctrl+C to stop"
echo ""

npm run dev
