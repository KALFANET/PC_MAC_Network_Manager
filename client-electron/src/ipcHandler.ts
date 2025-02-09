import { ipcMain } from 'electron';
import { checkForUpdates, fetchDevices, getSystemStatus, executeCommand } from './services/api';

// ✅ 1. שליפת סטטוס מערכת
ipcMain.handle('get-system-status', async () => {
  try {
    const status = await getSystemStatus();
    return status;
  } catch (error) {
    console.error('Failed to fetch system status:', error);
    throw error;
  }
});

// ✅ 2. שליפת רשימת מכשירים מחוברים
ipcMain.handle('fetch-devices', async () => {
  try {
    const devices = await fetchDevices();
    return devices;
  } catch (error) {
    console.error('Failed to fetch devices:', error);
    throw error;
  }
});

// ✅ 3. ביצוע פקודה (למשל הרצת טרמינל או פקודה ברקע)
ipcMain.handle('execute-command', async (_event, command: string) => {
  try {
    const result = await executeCommand(command);
    return result;
  } catch (error) {
    console.error('Command execution failed:', error);
    return { success: false, message: 'Execution failed' };
  }
});

// ✅ 4. בדיקת עדכוני מערכת
ipcMain.handle('check-for-updates', async () => {
  try {
    const updateStatus = await checkForUpdates();
    return updateStatus;
  } catch (error) {
    console.error('Failed to check for updates:', error);
    throw error;
  }
});