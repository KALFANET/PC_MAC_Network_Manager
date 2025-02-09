// services/validation.ts
import { z } from 'zod';

// Validation schemas
const schemas = {
  // System Settings
  systemSettings: z.object({
    language: z.enum(['en', 'he']),
    theme: z.enum(['light', 'dark', 'system']),
    autoUpdate: z.boolean(),
    debugMode: z.boolean(),
    retentionDays: z.number().min(1).max(365)
  }),

  // User Management
  user: z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    role: z.enum(['admin', 'technician', 'viewer']),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    })
  }),

  // Software Installation
  software: z.object({
    name: z.string().min(1),
    version: z.string(),
    platform: z.enum(['windows', 'mac']),
    requiredSpace: z.number().min(0),
    autoInstall: z.boolean()
  }),

  // Command Execution
  command: z.object({
    type: z.enum(['system', 'network', 'process']),
    command: z.string().min(1),
    params: z.record(z.string()).optional()
  })
};

// Validation functions
export const validate = {
  systemSettings: (data: unknown) => {
    return schemas.systemSettings.safeParse(data);
  },
  
  user: (data: unknown) => {
    return schemas.user.safeParse(data);
  },
  
  software: (data: unknown) => {
    return schemas.software.safeParse(data);
  },
  
  command: (data: unknown) => {
    return schemas.command.safeParse(data);
  }
};

// Input sanitization
export const sanitize = {
  command: (command: string): string => {
    // Remove potentially dangerous characters
    return command.replace(/[;&|`$]/g, '');
  },

  filepath: (path: string): string => {
    // Remove directory traversal attempts
    return path.replace(/\.{2,}/g, '.');
  },

  text: (text: string): string => {
    // Basic XSS prevention
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
};

// Type guards
export const guards = {
  isValidCommand: (command: unknown): command is { type: string; command: string } => {
    return (
      typeof command === 'object' &&
      command !== null &&
      'type' in command &&
      'command' in command &&
      typeof command.type === 'string' &&
      typeof command.command === 'string'
    );
  },

  isValidSoftware: (software: unknown): software is { name: string; version: string } => {
    return (
      typeof software === 'object' &&
      software !== null &&
      'name' in software &&
      'version' in software &&
      typeof software.name === 'string' &&
      typeof software.version === 'string'
    );
  }
};

export { schemas };

// No default export - we'll use named exports instead
export type { z };