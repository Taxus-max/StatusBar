const { app, BrowserWindow} = require('electron');
const path = require('path');
require('electron-reload')(__dirname);
const {createTaskbarIcon} = require('./taskbarManager');


if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        icon: __dirname + '/assets/tmp-logo.png',
        autoHideMenuBar: true,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'))
    mainWindow.hide();
};

app.whenReady().then(() => {
    createTaskbarIcon();
})

app.on('ready', createWindow);
app.allowRendererProcessReuse = false
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
