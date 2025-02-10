"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getProfile = exports.login = exports.register = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = "http://localhost:4000/api/users"; // ודא שהכתובת נכונה
/** ✅ רישום משתמש חדש */
const register = async (username, email, password) => {
    try {
        const response = await axios_1.default.post(`${API_URL}/register`, { username, email, password });
        saveToken(response.data.token);
        return response.data;
    }
    catch (error) {
        throw new Error("Registration failed. " + getErrorMessage(error));
    }
};
exports.register = register;
/** ✅ התחברות משתמש קיים */
const login = async (email, password) => {
    try {
        const response = await axios_1.default.post(`${API_URL}/login`, { email, password });
        saveToken(response.data.token);
        return response.data;
    }
    catch (error) {
        throw new Error("Login failed. " + getErrorMessage(error));
    }
};
exports.login = login;
/** ✅ שליפת פרופיל המשתמש */
const getProfile = async () => {
    try {
        const token = getToken();
        if (!token)
            throw new Error("No authentication token found.");
        const response = await axios_1.default.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to fetch profile. " + getErrorMessage(error));
    }
};
exports.getProfile = getProfile;
/** ✅ התנתקות והסרת הטוקן */
const logout = () => {
    removeToken();
};
exports.logout = logout;
/** 🛠 פונקציות עזר לאחסון טוקן */
const saveToken = (token) => localStorage.setItem("authToken", token);
const getToken = () => localStorage.getItem("authToken");
const removeToken = () => localStorage.removeItem("authToken");
/** 🛠 פונקציה לשליפת הודעות שגיאה */
const getErrorMessage = (error) => {
    if (axios_1.default.isAxiosError(error)) {
        return error.response?.data?.message || "Unknown server error.";
    }
    return "An unexpected error occurred.";
};
//# sourceMappingURL=authService.js.map