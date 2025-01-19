const { app, BrowserWindow, ipcMain } = require('electron');
const si = require('systeminformation');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.openDevTools();

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
ipcMain.handle('get-system-info', async () => {
  const cpu = await si.cpu();
  const memory = await si.mem();
  const disks = await si.fsSize();

  return {
    cpu: {
      model: cpu.manufacturer + ' ' + cpu.brand,
      cores: cpu.cores,
      speed: (cpu.speed / 1000).toFixed(2)
    },
    memory: {
      total: (memory.total / 1024 / 1024 / 1024).toFixed(2),
      free: (memory.free / 1024 / 1024 / 1024).toFixed(2)
    },
    disks: disks.map(disk => ({
      name: disk.fs,
      size: (disk.size / 1024 / 1024 / 1024).toFixed(2),
      free: (disk.available / 1024 / 1024 / 1024).toFixed(2)
    }))
  };
});
