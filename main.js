const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec

/////////////// function ////////////////////

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        autoHideMenuBar: true,
        icon: __dirname + '/res/icons/icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'res/render/preload.js')
        }
    })

    win.loadFile('res/render/index.html')
    win.setMenu(null)
    win.webContents.openDevTools()
}

/////////////// function ////////////////////


///////////////// app ///////////////////////

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

///////////////// app ///////////////////////