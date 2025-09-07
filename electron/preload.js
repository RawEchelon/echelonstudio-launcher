const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Modpack management
  getModpacks: () => ipcRenderer.invoke('get-modpacks'),
  createModpack: (modpackData) => ipcRenderer.invoke('create-modpack', modpackData),
  installModpack: (modpackId, installPath) => ipcRenderer.invoke('install-modpack', modpackId, installPath),
  
  // File system operations
  selectMinecraftDirectory: () => ipcRenderer.invoke('select-minecraft-directory'),
  selectModpackFile: () => ipcRenderer.invoke('select-modpack-file'),
  
  // Window operations
  closeWindow: () => ipcRenderer.invoke('close-window'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
});