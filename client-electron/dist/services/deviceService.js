"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevices = exports.registerDevice = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = "http://localhost:4000/api/devices"; // ודא שהכתובת נכונה
/** ✅ רישום מכשיר חדש */
const registerDevice = async (deviceId, name, type) => {
    try {
        const token = getToken();
        if (!token)
            throw new Error("No authentication token found.");
        const response = await axios_1.default.post(`${API_URL}/register`, { deviceId, name, type }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (error) {
        throw new Error("Device registration failed. " + getErrorMessage(error));
    }
};
exports.registerDevice = registerDevice;
/** ✅ שליפת כל המכשירים של המשתמש */
const getDevices = async () => {
    try {
        const token = getToken();
        if (!token)
            throw new Error("No authentication token found.");
        const response = await axios_1.default.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to retrieve devices. " + getErrorMessage(error));
    }
};
exports.getDevices = getDevices;
/** 🛠 פונקציות עזר לניהול טוקן */
const getToken = () => localStorage.getItem("authToken");
/** 🛠 פונקציה לשליפת הודעות שגיאה */
const getErrorMessage = (error) => {
    if (axios_1.default.isAxiosError(error)) {
        return error.response?.data?.message || "Unknown server error.";
    }
    return "An unexpected error occurred.";
};
//# sourceMappingURL=deviceService.js.map