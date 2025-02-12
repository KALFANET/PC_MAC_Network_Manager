"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_1 = __importDefault(require("./api"));
exports.userService = {
    fetchUsers: async () => {
        return await api_1.default.fetchUsers();
    },
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
            console.error("User API Error:", error);
            throw error;
        }
    },
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
            console.error("User API Error:", error);
            throw error;
        }
    },
};
//# sourceMappingURL=UserService.js.map