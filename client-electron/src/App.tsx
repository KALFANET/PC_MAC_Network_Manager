import React, { useEffect, useState } from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import useSystemStore from "./store";
import { endpoints } from "./services/api";
import { validate, schemas } from "./services/validation";

const App = () => {
  const { status, currentDevice, checkConnection, refreshMetrics, executeCommand } = useSystemStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        await checkConnection();
        
        if (status.connected && endpoints) {
          await refreshMetrics();
        }
      } catch (error) {
        console.error("Status check failed:", error);
        setError(error instanceof Error ? error.message : "Status check failed");
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [checkConnection, refreshMetrics, status.connected]);

  const handleCommand = async (cmd: unknown) => {
    try {
      const validationResult = validate.command(cmd);
      
      if (!validationResult.success) {
        throw new Error(validationResult.error.message);
      }
      
      await executeCommand(validationResult.data);
    } catch (error) {
      console.error("Command execution failed:", error);
      setError(error instanceof Error ? error.message : "Command execution failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Network Manager</h1>
        <button
          onClick={() => refreshMetrics()}
          disabled={isLoading || !status.connected}
          className="p-2 rounded hover:bg-slate-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-2">
          {status.connected ? (
            <Wifi className="text-green-500" />
          ) : (
            <WifiOff className="text-red-500" />
          )}
          <span>{status.connected ? "Connected" : "Disconnected"}</span>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-slate-100 border border-red-500 rounded text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;