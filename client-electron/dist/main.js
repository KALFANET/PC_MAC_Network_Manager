"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let mainWindow = null;
electron_1.app.whenReady().then(() => {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload", "preload.js"),
            contextIsolation: true,
            nodeIntegration: false, // לא ניתן להפעיל Node.js בדפדפן של Electron
        },
    });
    // אם היישום רץ ב-React, נטען את ה-URL המקומי (localhost:3000)
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map