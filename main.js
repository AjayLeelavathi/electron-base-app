const {app, BrowserWindow} = require('electron')
const ejse = require('ejs-electron')
const ipc = require('electron').ipcMain;
const path = require('path');
const url  = require('url');

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

ipc.on('aSynMessage', (event, args) => {
  ejse.data('category_date', args);
  BrowserWindow.getAllWindows()[0].loadURL(url.format({
    pathname : path.join(__dirname,'/views/category/edit.ejs'),
    protocol:'file',
    slashes:true
  }));
});