import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data: any) => ipcRenderer.send(channel, data),
  receive: (channel: string, callback: (data: any) => void) =>
    ipcRenderer.on(channel, (_event, data) => callback(data))
});

window.addEventListener('DOMContentLoaded', () => {
  // Code inside DOMContentLoaded event listener
  const replaceText = (selector: string, text: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  };
});
