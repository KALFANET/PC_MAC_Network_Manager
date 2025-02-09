import axios from "axios";

const API_URL = "http://localhost:4000/api/users"; // ודא שהכתובת נכונה

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

/** ✅ רישום משתמש חדש */
export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, { username, email, password });
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed. " + getErrorMessage(error));
  }
};

/** ✅ התחברות משתמש קיים */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw new Error("Login failed. " + getErrorMessage(error));
  }
};

/** ✅ שליפת פרופיל המשתמש */
export const getProfile = async (): Promise<AuthResponse["user"]> => {
  try {
    const token = getToken();
    if (!token) throw new Error("No authentication token found.");

    const response = await axios.get<AuthResponse["user"]>(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile. " + getErrorMessage(error));
  }
};

/** ✅ התנתקות והסרת הטוקן */
export const logout = () => {
  removeToken();
};

/** 🛠 פונקציות עזר לאחסון טוקן */
const saveToken = (token: string) => localStorage.setItem("authToken", token);
const getToken = () => localStorage.getItem("authToken");
const removeToken = () => localStorage.removeItem("authToken");

/** 🛠 פונקציה לשליפת הודעות שגיאה */
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Unknown server error.";
  }
  return "An unexpected error occurred.";
};