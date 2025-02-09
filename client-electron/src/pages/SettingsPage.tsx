import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import useSystemStore from "../store";
import { endpoints } from "../services/api";

const SettingsPage: React.FC = () => {
  const { status, updateStatus } = useSystemStore();
  const [debugMode, setDebugMode] = useState(status.debugMode);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDebugMode(status.debugMode);
  }, [status.debugMode]);

  const toggleDebugMode = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    updateStatus({ debugMode: newDebugMode });
  };

  const checkForUpdates = async () => {
    try {
      setError(null);
      const response = await endpoints.checkForUpdates();
      console.log("Update check response:", response);
      setAutoUpdate(response.autoUpdateEnabled);
    } catch (error) {
      console.error("Failed to check updates:", error);
      setError("Failed to check for updates.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Settings</h1>

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <Switch checked={debugMode} onChange={toggleDebugMode} className={`${
            debugMode ? "bg-blue-500" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full`}>
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

      <button
        onClick={checkForUpdates}
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Check for Updates
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SettingsPage;