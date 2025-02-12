"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const useSystemStore = (0, zustand_1.create)()((0, middleware_1.persist)((0, middleware_1.devtools)((set, get) => ({
    status: {
        connected: false,
        lastUpdate: new Date().toISOString(),
        version: "1.0.0",
        debugMode: false,
    },
    currentDevice: "Unknown Device",
    device: [],
    users: [],
    updatedevice: (newDevices) => set(() => ({ device: newDevices })),
    updateUsers: (users) => set(() => ({ users })),
    refreshMetrics: () => {
        console.log("Refreshing system metrics...");
    },
    executeCommand: async (cmd) => {
        console.log(`Executing command: ${cmd.command} (Type: ${cmd.type})`);
        if (!cmd.command) {
            console.error("Missing command");
            return;
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Command executed successfully.");
        }
        catch (error) {
            console.error("Command execution failed:", error);
        }
    },
    updateStatus: (newStatus) => set((state) => ({
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
        }
        catch (error) {
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
})), { name: "system-store", version: 1 }));
exports.default = useSystemStore;
//# sourceMappingURL=store.js.map