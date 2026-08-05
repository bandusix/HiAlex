@echo off
REM Quick development script for HiAlex

echo HiAlex Development Helper
echo =========================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check for resources
echo Checking resources...
if not exist "resources\logo.svg" (
    echo Warning: resources\logo.svg not found
)

if not exist "resources\claude-cli-setup.exe" (
    echo Note: Claude CLI installer not found in resources\
    echo   Add it to test full installation flow
)

if not exist "resources\paseo-setup.exe" (
    echo Note: Paseo installer not found in resources\
    echo   Installer will fall back to npm installation
)

echo.
echo Starting HiAlex in development mode...
echo Press Ctrl+C to stop
echo.

npm run dev
