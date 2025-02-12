import React from 'react';
import { Wifi, WifiOff, Activity } from "lucide-react";

interface Device {
  id: string;
  name: string;
  status: string;
  cpuUsage: number;
  ramUsage: number;
  networkUsage: number;
}

interface DashboardProps {
  devices: Device[];  // זכרו שה-devices הוא מערך ריק אם אין נתונים
}

const Dashboard: React.FC<DashboardProps> = ({ devices = [] }) => {  // אם devices לא קיים, ישתמש במערך ריק
  const connectionStatus = devices.length > 0 ? "connected" : "disconnected";

  const handleConnect = (deviceId: string) => {
    console.log(`Connecting to device: ${deviceId}`);
    // Implementation for connecting to device
  };

  const handleDetails = (deviceId: string) => {
    console.log(`Showing details for device: ${deviceId}`);
    // Implementation for showing device details
  };

  return (
    <div className="h-full bg-gray-100">
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <h1 className="text-sm font-medium">Network Dashboard</h1>
          </div>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {connectionStatus === "connected" ? (
                <Wifi className="text-green-500" />
              ) : (
                <WifiOff className="text-red-500" />
              )}
              <span className="capitalize">{connectionStatus}</span>
            </div>
            <div className="text-sm text-gray-500">
              {devices.length} {devices.length === 1 ? 'device' : 'devices'} connected
            </div>
          </div>

          {/* Device List */}
          <div className="space-y-4">
            {devices.length > 0 ? (
              devices.map((device) => (
                <div 
                  key={device.id} 
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-medium">{device.name}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {device.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">CPU</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${device.cpuUsage || 0}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{device.cpuUsage}%</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">RAM</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${device.ramUsage || 0}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{device.ramUsage}%</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Network</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${device.networkUsage || 0}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{device.networkUsage}%</div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-2">
                    <button
                      onClick={() => handleConnect(device.id)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Connect
                    </button>
                    <button
                      onClick={() => handleDetails(device.id)}
                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No devices found. Please check your connection.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;