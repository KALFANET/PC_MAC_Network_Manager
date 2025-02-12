import { ipcMain } from "electron";
import endpoints from "./services/api";
import useSystemStore from "./store"; // ✅ שימוש ב-Zustand Store
import {Command} from "./types"; // ✅ ייבוא סוגים
// ✅ שליחת סטטוס מערכת
ipcMain.handle("getSystemStatus", async () => {
  try {
    return await endpoints.getSystemStatus();
  } catch (error) {
    console.error("Error in getSystemStatus:", error);
    return { error: "Failed to fetch system status" };
  }
});

// ✅ שליפת רשימת מכשירים ועדכון הסטור
ipcMain.handle("fetchDevices", async () => {
  try {
    const devices = await endpoints.fetchDevices();
    useSystemStore.getState().updatedevice(devices); // ✅ עדכון Zustand Store
    return devices;
  } catch (error) {
    console.error("Error in fetchDevices:", error);
    return { error: "Failed to fetch devices" };
  }
});

// ✅ הרצת פקודה מרחוק
ipcMain.handle("executeCommand", async (_event, { type, command, params }: Command) => {
  try {
    const { executeCommand } = useSystemStore.getState(); // ✅ ווידוא השימוש הנכון ב-Zustand
    return await executeCommand({ type, command, params });
  } catch (error) {
    console.error("Error executing command:", error);
    return { error: "Command execution failed" };
  }
});

// ✅ בדיקת עדכונים
ipcMain.handle("checkForUpdates", async () => {
  try {
    return await endpoints.checkForUpdates();
  } catch (error) {
    console.error("Error checking for updates:", error);
    return { error: "Failed to check for updates" };
  }
});