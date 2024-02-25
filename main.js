const {app, BrowserWindow} = require('electron')
const ejse = require('ejs-electron')

let mainWindow

ejse.data('username', 'Some Guy')
 
app.on('ready', () => {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/views/category/index.ejs')
})