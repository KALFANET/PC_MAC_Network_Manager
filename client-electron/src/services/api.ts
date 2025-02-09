export const endpoints = {
  // ✅ 1. שליפת רשימת מכשירים
  fetchDevices: async () => {
    try {
      const response = await fetch("http://localhost:4000/api/devices");
      if (!response.ok){ throw new Error("Failed to fetch devices");}
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // ✅ 2. בדיקת סטטוס מערכת
  getSystemStatus: async () => {
    try {
      const response = await fetch("http://localhost:4000/api/system-status");
      if (!response.ok) {
      throw new Error("Failed to fetch system status");}
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};

export default endpoints;