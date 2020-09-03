const {app, BrowserWindow} = require('electron')
const path = require('path')

require('electron-reload')(__dirname);

const createWindow =() => {
    // create the browser window
    const mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            nodeIntegration:true
        }
    })
    // load the index.html 
    mainWindow.loadFile('../components/index.html')

    // Open the DevTools
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
}) 

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow()
    }
} )

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

