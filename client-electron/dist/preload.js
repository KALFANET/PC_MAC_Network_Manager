import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, callback) => ipcRenderer.on(channel, (_event, data) => callback(data))
});
window.addEventListener('DOMContentLoaded', () => {
    // Code inside DOMContentLoaded event listener
    const replaceText = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    };
});
//# sourceMappingURL=preload.js.map