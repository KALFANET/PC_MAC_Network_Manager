import { ipcMain } from "electron";
import { getSystemStatus, fetchDevices, executeCommand, checkForUpdates } from "./services/api";

// ✅ שליחת סטטוס מערכת
ipcMain.handle("getSystemStatus", async () => {
  try {
    return await getSystemStatus();
  } catch (error) {
    console.error("Error in getSystemStatus:", error);
    return { error: "Failed to fetch system status" };
  }
});

// ✅ שליפת רשימת מכשירים
ipcMain.handle("fetchDevices", async () => {
  try {
    return await fetchDevices();
  } catch (error) {
    console.error("Error in fetchDevices:", error);
    return { error: "Failed to fetch devices" };
  }
});

// ✅ הרצת פקודה מרחוק
ipcMain.handle("executeCommand", async (_event, { command, params }) => {
  try {
    return await executeCommand(command, params);
  } catch (error) {
    console.error("Error executing command:", error);
    return { error: "Command execution failed" };
  }
});

// ✅ בדיקת עדכונים
ipcMain.handle("checkForUpdates", async () => {
  try {
    return await checkForUpdates();
  } catch (error) {
    console.error("Error checking for updates:", error);
    return { error: "Failed to check for updates" };
  }
});