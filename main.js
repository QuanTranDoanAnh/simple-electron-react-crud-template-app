const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const url = require('node:url')

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Electrong React CRUD app',
    width: 1000,
    height: 600,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  const startUrl = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file'
  })

  mainWindow.loadURL(startUrl)
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(createMainWindow)

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})