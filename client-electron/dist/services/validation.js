"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.guards = exports.sanitize = exports.validate = void 0;
// services/validation.ts
const zod_1 = require("zod");
// Validation schemas
const schemas = {
    // System Settings
    systemSettings: zod_1.z.object({
        language: zod_1.z.enum(['en', 'he']),
        theme: zod_1.z.enum(['light', 'dark', 'system']),
        autoUpdate: zod_1.z.boolean(),
        debugMode: zod_1.z.boolean(),
        retentionDays: zod_1.z.number().min(1).max(365)
    }),
    // User Management
    user: zod_1.z.object({
        username: zod_1.z.string().min(3).max(50),
        email: zod_1.z.string().email(),
        role: zod_1.z.enum(['admin', 'technician', 'viewer']),
        password: zod_1.z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        })
    }),
    // Software Installation
    software: zod_1.z.object({
        name: zod_1.z.string().min(1),
        version: zod_1.z.string(),
        platform: zod_1.z.enum(['windows', 'mac']),
        requiredSpace: zod_1.z.number().min(0),
        autoInstall: zod_1.z.boolean()
    }),
    // Command Execution
    command: zod_1.z.object({
        type: zod_1.z.enum(['system', 'network', 'process']),
        command: zod_1.z.string().min(1),
        params: zod_1.z.record(zod_1.z.string()).optional()
    })
};
exports.schemas = schemas;
// Validation functions
exports.validate = {
    systemSettings: (data) => {
        return schemas.systemSettings.safeParse(data);
    },
    user: (data) => {
        return schemas.user.safeParse(data);
    },
    software: (data) => {
        return schemas.software.safeParse(data);
    },
    command: (data) => {
        return schemas.command.safeParse(data);
    }
};
// Input sanitization
exports.sanitize = {
    command: (command) => {
        // Remove potentially dangerous characters
        return command.replace(/[;&|`$]/g, '');
    },
    filepath: (path) => {
        // Remove directory traversal attempts
        return path.replace(/\.{2,}/g, '.');
    },
    text: (text) => {
        // Basic XSS prevention
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    }
};
// Type guards
exports.guards = {
    isValidCommand: (command) => {
        return (typeof command === 'object' &&
            command !== null &&
            'type' in command &&
            'command' in command &&
            typeof command.type === 'string' &&
            typeof command.command === 'string');
    },
    isValidSoftware: (software) => {
        return (typeof software === 'object' &&
            software !== null &&
            'name' in software &&
            'version' in software &&
            typeof software.name === 'string' &&
            typeof software.version === 'string');
    }
};
//# sourceMappingURL=validation.js.map