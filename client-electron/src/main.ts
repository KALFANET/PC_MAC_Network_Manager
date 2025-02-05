import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null; // משתנה גלובלי

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'dist', 'preload.js'), // ✅ תיקון נתיב preload
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'public', 'index.html')); // ✅ תיקון נתיב index.html

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        preload: path.join(__dirname, 'dist', 'preload.js'), // ✅ זהה להגדרה הקודמת
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    mainWindow.loadFile(path.join(__dirname, '..', 'public', 'index.html')); // ✅ תיקון נתיב index.html
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});