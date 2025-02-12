import { contextBridge, ipcRenderer } from 'electron';

// הגדרת ה-API שיהיה זמין ל-renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // כאן תוכל להוסיף פונקציות שיהיו זמינות ל-renderer
  sendMessage: (message: string) => ipcRenderer.send('message', message),
  onResponse: (callback: (response: any) => void) => {
    ipcRenderer.on('response', (_event, response) => callback(response));
  }
});