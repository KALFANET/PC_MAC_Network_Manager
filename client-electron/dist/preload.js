"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// ✅ חשיפת פונקציות בצורה מאובטחת
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    getSystemStatus: async () => {
        try {
            return await electron_1.ipcRenderer.invoke("getSystemStatus");
        }
        catch (error) {
            console.error("Error in getSystemStatus:", error);
            return { error: "Failed to fetch system status" };
        }
    },
    fetchDevices: async () => {
        try {
            return await electron_1.ipcRenderer.invoke("fetchDevices");
        }
        catch (error) {
            console.error("Error in fetchDevices:", error);
            return { error: "Failed to fetch devices" };
        }
    },
    executeCommand: async (command, params) => {
        try {
            return await electron_1.ipcRenderer.invoke("executeCommand", { command, params });
        }
        catch (error) {
            console.error("Error executing command:", error);
            return { error: "Command execution failed" };
        }
    },
    checkForUpdates: async () => {
        try {
            return await electron_1.ipcRenderer.invoke("checkForUpdates");
        }
        catch (error) {
            console.error("Error checking for updates:", error);
            return { error: "Failed to check for updates" };
        }
    },
    // ✅ מאזינים לאירועים שיוזמים מה-Main Process
    onUpdateAvailable: (callback) => {
        electron_1.ipcRenderer.on("updateAvailable", (_event, info) => callback(info));
    },
    onSystemStatusChange: (callback) => {
        electron_1.ipcRenderer.on("systemStatusChange", (_event, status) => callback(status));
    },
    onDeviceListUpdate: (callback) => {
        electron_1.ipcRenderer.on("deviceListUpdate", (_event, devices) => callback(devices));
    }
});
//# sourceMappingURL=preload.js.map