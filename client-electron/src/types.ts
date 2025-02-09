// src/types.ts
export interface Command {
    type: "system" | "network" | "process";
    command: string;
    params?: Record<string, string>;
  }