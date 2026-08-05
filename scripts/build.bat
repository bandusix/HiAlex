@echo off
REM HiAlex Build Script for Windows

echo Building HiAlex Installer...

REM Create resources directory
if not exist "resources" mkdir resources

REM Check for Claude CLI resources
echo Checking for Claude CLI resources...
if not exist "resources\claude-cli-setup.exe" (
  echo Note: Add Claude CLI installer to resources\claude-cli-setup.exe
)

REM Check for Paseo resources
echo Checking for Paseo resources...
if not exist "resources\paseo-setup.exe" (
  echo Note: Add Paseo installer to resources\paseo-setup.exe
)

REM Install dependencies
echo Installing dependencies...
call npm install

REM Build the installer
echo Building Windows installer...
call npm run package:win

echo Build complete! Check the dist\ directory for installers.
pause
