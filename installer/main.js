const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { InstallationManager } = require('./installation-manager');
const Store = require('electron-store');

const store = new Store();
const installManager = new InstallationManager();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../resources/icon.png'),
    frame: true,
    titleBarStyle: 'default'
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

  // Open DevTools in development mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('get-installation-status', async () => {
  return await installManager.checkInstallationStatus();
});

ipcMain.handle('start-installation', async (event, options) => {
  try {
    // Send progress updates to renderer
    installManager.on('progress', (data) => {
      mainWindow.webContents.send('installation-progress', data);
    });

    const result = await installManager.install(options);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-configuration', async (event, config) => {
  try {
    await installManager.saveConfiguration(config);
    store.set('configuration', config);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('test-configuration', async (event, config) => {
  try {
    const result = await installManager.testConfiguration(config);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-saved-configuration', async () => {
  return store.get('configuration', {});
});

ipcMain.handle('select-directory', async () => {
  const { dialog } = require('electron');
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});
