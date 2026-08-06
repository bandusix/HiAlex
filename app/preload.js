const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('hialex', {
  saveConfiguration: (config) => ipcRenderer.invoke('save-configuration', config),
  getConfiguration: () => ipcRenderer.invoke('get-configuration'),
  testConfiguration: (config) => ipcRenderer.invoke('test-configuration', config),
  openMainApp: () => ipcRenderer.invoke('open-main-app'),
  sendMessage: (message) => ipcRenderer.invoke('send-message', message)
});
