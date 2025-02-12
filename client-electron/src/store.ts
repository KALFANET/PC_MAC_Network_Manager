import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Command } from "./types"; // ✅ תיקון הנתיב לייבוא נכון

interface Status {
  connected: boolean;
  lastUpdate: string;
  version: string;
  debugMode: boolean;
}

interface Devices {
  id: string;
  name: string;
  status: string;
  cpuUsage: number;   // הוספת שדה cpuUsage
  ramUsage: number;    // הוספת שדה ramUsage
  networkUsage: number;  // הוספת שדה networkUsage
}
interface User {
  id: string;
  name: string;
  email: string;
}

interface SystemState {
  status: Status;
  currentDevice: string;
  device: Devices[];  // מערך מסוג Devices (כולל את השדות הנוספים)
  users: User[];
  updatedevice: (device: Devices[]) => void;
  updateUsers: (users: User[]) => void;
  refreshMetrics: () => void;
  executeCommand: (cmd: Command) => Promise<void>;
  updateStatus: (newStatus: Partial<Status>) => void;
  checkConnection: () => Promise<boolean>;
}

const useSystemStore = create<SystemState>()(
  persist(
    devtools((set, get) => ({
      status: {
        connected: false,
        lastUpdate: new Date().toISOString(),
        version: "1.0.0",
        debugMode: false,
      },
      currentDevice: "Unknown Device",
      device: [],  // ✅ אתחול ערך ברירת מחדל הוא מערך ריק
      users: [],  // ✅ מערך משתמשים ריק כברירת מחדל

      updatedevice: (newDevices) => set(() => ({ device: newDevices })),

      updateUsers: (users) => set(() => ({ users })), // ✅ עדכון רשימת המשתמשים

      refreshMetrics: () => {
        console.log("Refreshing system metrics...");
      },

      executeCommand: async (cmd: Command) => {
        console.log(`Executing command: ${cmd.command} (Type: ${cmd.type})`);
        if (!cmd.command) {
          console.error("Missing command");
          return;
        }
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log("Command executed successfully.");
        } catch (error) {
          console.error("Command execution failed:", error);
        }
      },

      updateStatus: (newStatus) =>
        set((state) => ({
          status: { ...state.status, ...newStatus },
        })),

      checkConnection: async () => {
        try {
          console.log("Checking system connection...");
          const isConnected = Math.random() > 0.5;
          set((state) => ({
            status: {
              ...state.status,
              connected: isConnected,
              lastUpdate: new Date().toISOString(),
            },
          }));
          console.log(`Connection status: ${isConnected ? "Connected" : "Disconnected"}`);
          return isConnected;
        } catch (error) {
          console.error("Connection check failed:", error);
          set((state) => ({
            status: {
              ...state.status,
              connected: false,
              lastUpdate: new Date().toISOString(),
            },
          }));
          return false;
        }
      },
    })),
    { name: "system-store", version: 1 }
  )
);

export default useSystemStore;