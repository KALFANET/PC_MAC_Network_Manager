"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = void 0;
exports.endpoints = {
    // ✅ 1. שליפת רשימת מכשירים
    fetchDevices: async () => {
        try {
            const response = await fetch("http://localhost:4000/api/devices");
            if (!response.ok) {
                throw new Error("Failed to fetch devices");
            }
            return await response.json();
        }
        catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },
    // ✅ 2. בדיקת סטטוס מערכת
    getSystemStatus: async () => {
        try {
            const response = await fetch("http://localhost:4000/api/system-status");
            if (!response.ok) {
                throw new Error("Failed to fetch system status");
            }
            return await response.json();
        }
        catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },
    // ✅ 3. בדיקת עדכונים
    checkForUpdates: async () => {
        try {
            const response = await fetch("http://localhost:4000/api/check-updates");
            if (!response.ok) {
                throw new Error("Failed to check for updates");
            }
            return await response.json();
        }
        catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },
    // ✅ 4. שליפת רשימת משתמשים
    fetchUsers: async () => {
        try {
            const response = await fetch("http://localhost:4000/api/users");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return await response.json();
        }
        catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },
    // ✅ 5. הוספת משתמש חדש
    addUser: async (name, email, password) => {
        try {
            const response = await fetch("http://localhost:4000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            if (!response.ok) {
                throw new Error("Failed to add user");
            }
            return await response.json();
        }
        catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },
    // ✅ 6. מחיקת משתמש
    deleteUser: async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            return await response.json();
        }
        catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },
};
exports.default = exports.endpoints;
//# sourceMappingURL=api.js.map