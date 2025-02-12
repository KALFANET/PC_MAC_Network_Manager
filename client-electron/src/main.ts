import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload", "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,  // לא ניתן להפעיל Node.js בדפדפן של Electron
        },
    });

    // אם היישום רץ ב-React, נטען את ה-URL המקומי (localhost:3000)
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});