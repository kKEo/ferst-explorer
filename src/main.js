const { app, BrowserWindow, Menu, Tray, screen } = require('electron');
const path = require('node:path');

const windows = {}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => { /* no window is opened on the startup, open app in tray */ };

function openWindow(application_id) {
  const webPreferences = {
    nodeIntegration: true,
    contextIsolation: false
  }
  const windowWidth = 1600
  const windowHeight = 1200
  const point = screen.getCursorScreenPoint()
  const { width, height, x, y } = screen.getDisplayNearestPoint(point).workArea;
  const options = { 
    width: windowWidth, 
    height: windowHeight, 
    webPreferences 
  }
  let window = new BrowserWindow(options)

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    console.log("Load url: ", MAIN_WINDOW_VITE_DEV_SERVER_URL)
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    const file = path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    console.log("Load file: ", file)
    window.loadFile(file);
  }

  window.on('close', () => { window = null })
  window.webContents.openDevTools()
  

  let bounds = window.getBounds()
  bounds.x = x + (width - windowWidth) / 2 
  bounds.y = y + (height - windowHeight) / 2
  window.setBounds(bounds)


  return window
}

function showSettings() {
  const id = 'azure-mgnt'
  if (windows[id] === undefined || windows[id].isDestroyed()) {
    console.log('Creating new app: '+id)
    windows[id] = openWindow(id)
  }
  windows[id].show()
}

function showExplorer() {

}

app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  let tray = new Tray('icons/gear.png')
  tray.setToolTip('')

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Explorer', click: showSettings},
     {label: 'Settings', click: showSettings}
  ])

  tray.setContextMenu(contextMenu)
});




// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
