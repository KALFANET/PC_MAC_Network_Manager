import axios from "axios";

const API_URL = "http://localhost:4000/api/devices"; // ודא שהכתובת נכונה

export interface Device {
  id: string;
  deviceId: string;
  name: string;
  type: string;
  status: string;
}

/** ✅ רישום מכשיר חדש */
export const registerDevice = async (deviceId: string, name: string, type: string): Promise<Device> => {
  try {
    const token = getToken();
    if (!token) throw new Error("No authentication token found.");

    const response = await axios.post<Device>(
      `${API_URL}/register`,
      { deviceId, name, type },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    throw new Error("Device registration failed. " + getErrorMessage(error));
  }
};

/** ✅ שליפת כל המכשירים של המשתמש */
export const getDevices = async (): Promise<Device[]> => {
  try {
    const token = getToken();
    if (!token) throw new Error("No authentication token found.");

    const response = await axios.get<Device[]>(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to retrieve devices. " + getErrorMessage(error));
  }
};

/** 🛠 פונקציות עזר לניהול טוקן */
const getToken = () => localStorage.getItem("authToken");

/** 🛠 פונקציה לשליפת הודעות שגיאה */
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Unknown server error.";
  }
  return "An unexpected error occurred.";
};