"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// הגדרת ה-API שיהיה זמין ל-renderer process
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    // כאן תוכל להוסיף פונקציות שיהיו זמינות ל-renderer
    sendMessage: (message) => electron_1.ipcRenderer.send('message', message),
    onResponse: (callback) => {
        electron_1.ipcRenderer.on('response', (_event, response) => callback(response));
    }
});
//# sourceMappingURL=preload.js.map