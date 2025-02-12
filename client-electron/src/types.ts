// src/types.ts

// טיפוס של מכשיר
export interface Device {
  id: string;
  name: string;
  status: "online" | "offline" | "error"; // מצב המכשיר
  cpuUsage: number; // אחוז השימוש ב-CPU
  ramUsage: number; // אחוז השימוש ב-RAM
  networkUsage: number; // אחוז השימוש ברשת
}

// טיפוס של פקודה (Command)
export interface Command {
  type: "system" | "network" | "process"; // סוג הפקודה
  command: string; // הפקודה עצמה
  params?: Record<string, string>; // פרמטרים נוספים (אופציונליים)
}