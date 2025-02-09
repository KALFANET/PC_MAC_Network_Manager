import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import useSystemStore from "../store";
import endpoints from "../services/api"; // ✅ שימוש נכון ב- `default export`

const SettingsPage: React.FC = () => {
  const { status, updateStatus } = useSystemStore();
  const [debugMode, setDebugMode] = useState(status.debugMode);
  const [autoUpdate, setAutoUpdate] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false); // ✅ משתנה חדש לחיווי טעינה

  /** ✅ עדכון `debugMode` כאשר הסטטוס משתנה */
  useEffect(() => {
    setDebugMode(status.debugMode);
  }, [status.debugMode]);

  /** ✅ שינוי מצב `debugMode` ושמירה ב-Store */
  const toggleDebugMode = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    updateStatus({ debugMode: newDebugMode });
  };

  /** ✅ בדיקה אם יש עדכונים זמינים */
  const checkForUpdates = async () => {
    try {
      setIsChecking(true);
      setError(null);
      const response = await endpoints.checkForUpdates();
      console.log("Update check response:", response);
      setAutoUpdate(response.autoUpdateEnabled);
    } catch (error) {
      console.error("Failed to check updates:", error);
      setError("Failed to check for updates.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Settings</h1>

      {/* ✅ Toggle Debug Mode */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <Switch
            checked={debugMode}
            onChange={toggleDebugMode}
            className={`${
              debugMode ? "bg-blue-500" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable Debug Mode</span>
            <span
              className={`${
                debugMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span>Enable Debug Mode</span>
        </label>
      </div>

      {/* ✅ כפתור לבדיקה אם יש עדכונים */}
      <button
        onClick={checkForUpdates}
        disabled={isChecking} // ✅ מניעת לחיצה כפולה
        className={`p-2 text-white rounded ${
          isChecking ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isChecking ? "Checking..." : "Check for Updates"}
      </button>

      {/* ✅ הצגת שגיאות */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {/* ✅ הצגת סטטוס עדכון */}
      {autoUpdate !== null && (
        <p className="mt-2 text-gray-700">
          Auto-update is {autoUpdate ? "enabled" : "disabled"}.
        </p>
      )}
    </div>
  );
};

export default SettingsPage;