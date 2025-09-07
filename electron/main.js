const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png'), // Add icon if available
    show: false,
    titleBarStyle: 'default'
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); // Vite dev server
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for modpack management
ipcMain.handle('get-modpacks', async () => {
  try {
    // This would typically fetch from your server API
    const response = await fetch('http://localhost:3001/api/modpacks');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch modpacks:', error);
    return [];
  }
});

ipcMain.handle('create-modpack', async (event, modpackData) => {
  try {
    const response = await fetch('http://localhost:3001/api/modpacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modpackData),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to create modpack:', error);
    throw error;
  }
});

ipcMain.handle('select-minecraft-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select Minecraft Directory'
  });
  
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('select-modpack-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Zip Files', extensions: ['zip'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    title: 'Select Modpack File'
  });
  
  return result.canceled ? null : result.filePaths[0];
});

// Handle modpack installation
ipcMain.handle('install-modpack', async (event, modpackId, installPath) => {
  try {
    // This is a placeholder - implement actual modpack installation logic
    console.log(`Installing modpack ${modpackId} to ${installPath}`);
    
    // Update download count
    await fetch(`http://localhost:3001/api/modpacks/${modpackId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'download' }),
    });
    
    return { success: true, message: 'Modpack installation started' };
  } catch (error) {
    console.error('Failed to install modpack:', error);
    return { success: false, error: error.message };
  }
});