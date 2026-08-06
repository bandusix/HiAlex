const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Simple JSON-based config store
class SimpleStore {
  constructor() {
    this.configDir = path.join(app.getPath('userData'), 'config');
    this.configFile = path.join(this.configDir, 'settings.json');
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(this.configFile)) {
        return JSON.parse(fs.readFileSync(this.configFile, 'utf-8'));
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
    return {};
  }

  save() {
    try {
      if (!fs.existsSync(this.configDir)) {
        fs.mkdirSync(this.configDir, { recursive: true });
      }
      fs.writeFileSync(this.configFile, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  }

  get(key, defaultValue) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }
}

let store;
let setupWindow;
let mainWindow;

function createSetupWindow() {
  setupWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../resources/logo.svg'),
    frame: true,
    titleBarStyle: 'default'
  });

  setupWindow.loadFile(path.join(__dirname, 'renderer/setup.html'));

  if (process.argv.includes('--dev')) {
    setupWindow.webContents.openDevTools();
  }

  setupWindow.on('closed', () => {
    setupWindow = null;
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../resources/logo.svg')
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/main.html'));

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  store = new SimpleStore();

  // Check if configured
  const config = store.get('configuration');
  if (config && config.baseUrl && config.authToken) {
    // Already configured, open main app
    createMainWindow();
  } else {
    // First time, show setup
    createSetupWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null && setupWindow === null) {
    const config = store.get('configuration');
    if (config && config.baseUrl && config.authToken) {
      createMainWindow();
    } else {
      createSetupWindow();
    }
  }
});

// IPC Handlers
ipcMain.handle('save-configuration', async (event, config) => {
  try {
    store.set('configuration', config);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-configuration', async () => {
  return store.get('configuration', {});
});

ipcMain.handle('test-configuration', async (event, config) => {
  try {
    const fetch = require('node-fetch');
    const response = await fetch(`${config.baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.authToken,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{
          role: 'user',
          content: 'test'
        }]
      })
    });

    if (response.ok) {
      return { valid: true, message: 'API connection successful' };
    } else {
      const error = await response.text();
      return { valid: false, message: `API error: ${response.status}` };
    }
  } catch (error) {
    return { valid: false, message: error.message };
  }
});

ipcMain.handle('open-main-app', async () => {
  if (setupWindow) {
    setupWindow.close();
  }
  createMainWindow();
  return { success: true };
});

ipcMain.handle('send-message', async (event, message) => {
  try {
    const config = store.get('configuration');
    if (!config || !config.authToken) {
      return { success: false, error: 'Not configured' };
    }

    const fetch = require('node-fetch');
    const response = await fetch(`${config.baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.authToken,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: message
        }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        reply: data.content[0].text
      };
    } else {
      const error = await response.text();
      return { success: false, error: `API error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
});
