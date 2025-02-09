import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { endpoints } from "./services/api";

// ✅ 1. הגדרת טיפוס Type עבור state כדי למנוע שגיאות TypeScript
type SystemState = {
  status: {
    connected: boolean;
    lastUpdate: string;
    version: string;
    debugMode: boolean;
  };
  updateStatus: (newStatus: Partial<SystemState["status"]>) => void;
  checkConnection: () => Promise<boolean>;
};

// ✅ 2. יצירת Zustand store עם הגדרות מתאימות
const useSystemStore = create<SystemState>()(
  devtools(
    persist(
      (set, get) => ({
        status: {
          connected: false,
          lastUpdate: new Date().toISOString(),
          version: "1.0.0",
          debugMode: false,
        },

        // ✅ 3. פונקציה לעדכון הסטטוס
        updateStatus: (newStatus) =>
          set((state) => ({
            status: { ...state.status, ...newStatus },
          })),

        // ✅ 4. פונקציה לבדיקה האם המערכת מחוברת
        checkConnection: async () => {
          try {
            const response = await endpoints.getSystemStatus();
            const isConnected = response.status === "connected";

            set((state) => ({
              status: {
                ...state.status,
                connected: isConnected,
                lastUpdate: new Date().toISOString(),
              },
            }));
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
      }),
      { name: "system-store" } // זיהוי מקומי של Zustand Persist
    )
  )
);

export default useSystemStore;  