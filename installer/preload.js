const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('hialex', {
  getInstallationStatus: () => ipcRenderer.invoke('get-installation-status'),
  startInstallation: (options) => ipcRenderer.invoke('start-installation', options),
  saveConfiguration: (config) => ipcRenderer.invoke('save-configuration', config),
  testConfiguration: (config) => ipcRenderer.invoke('test-configuration', config),
  getSavedConfiguration: () => ipcRenderer.invoke('get-saved-configuration'),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  onInstallationProgress: (callback) => {
    ipcRenderer.on('installation-progress', (event, data) => callback(data));
  }
});
