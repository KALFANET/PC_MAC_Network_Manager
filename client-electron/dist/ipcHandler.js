"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const api_1 = __importDefault(require("./services/api"));
const store_1 = __importDefault(require("./store")); // ✅ שימוש ב-Zustand Store
// ✅ שליחת סטטוס מערכת
electron_1.ipcMain.handle("getSystemStatus", async () => {
    try {
        return await api_1.default.getSystemStatus();
    }
    catch (error) {
        console.error("Error in getSystemStatus:", error);
        return { error: "Failed to fetch system status" };
    }
});
// ✅ שליפת רשימת מכשירים ועדכון הסטור
electron_1.ipcMain.handle("fetchDevices", async () => {
    try {
        const devices = await api_1.default.fetchDevices();
        store_1.default.getState().updatedevice(devices); // ✅ עדכון Zustand Store
        return devices;
    }
    catch (error) {
        console.error("Error in fetchDevices:", error);
        return { error: "Failed to fetch devices" };
    }
});
// ✅ הרצת פקודה מרחוק
electron_1.ipcMain.handle("executeCommand", async (_event, { type, command, params }) => {
    try {
        const { executeCommand } = store_1.default.getState(); // ✅ ווידוא השימוש הנכון ב-Zustand
        return await executeCommand({ type, command, params });
    }
    catch (error) {
        console.error("Error executing command:", error);
        return { error: "Command execution failed" };
    }
});
// ✅ בדיקת עדכונים
electron_1.ipcMain.handle("checkForUpdates", async () => {
    try {
        return await api_1.default.checkForUpdates();
    }
    catch (error) {
        console.error("Error checking for updates:", error);
        return { error: "Failed to check for updates" };
    }
});
//# sourceMappingURL=ipcHandler.js.map