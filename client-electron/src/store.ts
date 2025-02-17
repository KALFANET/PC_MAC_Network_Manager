import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Command } from './types';

// הגדרת הטיפוסים
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
  cpuUsage: number;
  ramUsage: number;
  networkUsage: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface SystemState {
  status: Status;
  currentDevice: string;
  device: Devices[];
  users: User[];
  updatedevice: (device: Devices[]) => void;
  updateUsers: (users: User[]) => void;
  refreshMetrics: () => void;
  executeCommand: (cmd: Command) => Promise<void>;
  updateStatus: (newStatus: Partial<Status>) => void;
  checkConnection: () => Promise<boolean>;
}

// ערכים התחלתיים
const initialStatus: Status = {
  connected: false,
  lastUpdate: new Date().toISOString(),
  version: "1.0.0",
  debugMode: false,
};

// יצירת ה-store
const useSystemStore = create<SystemState>()(
  persist(
    devtools((set, get) => ({
      status: initialStatus,
      currentDevice: "Unknown Device",
      device: [],
      users: [],

      updatedevice: (newDevices: Devices[]) => 
        set(() => ({ device: newDevices })),

      updateUsers: (users: User[]) => 
        set(() => ({ users })),

      refreshMetrics: () => {
        console.log("Refreshing system metrics...");
      },

      executeCommand: async (cmd: Command): Promise<void> => {
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

      updateStatus: (newStatus: Partial<Status>) =>
        set((state) => ({
          status: { ...state.status, ...newStatus },
        })),

      checkConnection: async (): Promise<boolean> => {
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
    {
      name: "system-store",
      version: 1
    }
  )
);

export default useSystemStore;