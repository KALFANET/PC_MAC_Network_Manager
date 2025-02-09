import React, { useState } from "react";
import { Wifi, WifiOff, Settings, Activity } from "lucide-react";

const Dashboard = () => {
  const [connectionStatus, setConnectionStatus] = useState("connected");

  return (
    <div className="h-screen bg-gray-100">
      <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <h1 className="text-sm font-medium">Network Manager</h1>
          </div>
        </div>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {connectionStatus === "connected" ? <Wifi className="text-green-500" /> : <WifiOff className="text-red-500" />}
              <span>{connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;