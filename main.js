const { app, BrowserWindow, ipcMain } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window;

function createWindow () {
  window = new BrowserWindow({ width: 800, height: 600 });
  window.loadFile('index.html');
  
  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  // On MAC don't quit unless explicit
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('quit', () => {
    app.quit();
});

app.on('activate', () => {
  // On MAC create new window if there isn't one
  if (window === null) {
    createWindow();
  }
});