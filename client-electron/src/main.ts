import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import "./ipcHandler"; 

let mainWindow: BrowserWindow | null = null; // משתנה גלובלי

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // ✅ תיקון נתיב preload
      nodeIntegration: false,
      contextIsolation: true
    }
  });


  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000"); // פיתוח - שרת React
  } else {
    mainWindow.loadFile(path.join(__dirname, '..','public', 'index.html')); // ✅ תיקון נתיב index.html
}

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    }
});