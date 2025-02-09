import { contextBridge, ipcRenderer } from "electron";

// ✅ חשיפת פונקציות בצורה מאובטחת
contextBridge.exposeInMainWorld("electronAPI", {
  getSystemStatus: async () => {
    try {
      return await ipcRenderer.invoke("getSystemStatus");
    } catch (error) {
      console.error("Error in getSystemStatus:", error);
      return { error: "Failed to fetch system status" };
    }
  },

  fetchDevices: async () => {
    try {
      return await ipcRenderer.invoke("fetchDevices");
    } catch (error) {
      console.error("Error in fetchDevices:", error);
      return { error: "Failed to fetch devices" };
    }
  },

  executeCommand: async (command: string, params?: Record<string, string>) => {
    try {
      return await ipcRenderer.invoke("executeCommand", { command, params });
    } catch (error) {
      console.error("Error executing command:", error);
      return { error: "Command execution failed" };
    }
  },

  checkForUpdates: async () => {
    try {
      return await ipcRenderer.invoke("checkForUpdates");
    } catch (error) {
      console.error("Error checking for updates:", error);
      return { error: "Failed to check for updates" };
    }
  },

  // ✅ מאזינים לאירועים שיוזמים מה-Main Process
  onUpdateAvailable: (callback: (info: any) => void) => {
    ipcRenderer.on("updateAvailable", (_event, info) => callback(info));
  },

  onSystemStatusChange: (callback: (status: any) => void) => {
    ipcRenderer.on("systemStatusChange", (_event, status) => callback(status));
  },

  onDeviceListUpdate: (callback: (devices: any) => void) => {
    ipcRenderer.on("deviceListUpdate", (_event, devices) => callback(devices));
  }
});