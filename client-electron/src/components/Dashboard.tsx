import React from 'react';
import { Wifi, WifiOff, Activity } from "lucide-react";
import useSystemStore from '../store'; // הוספת ייבוא של ה-store

interface Device {
  id: string;
  name: string;
  status: string;
  cpuUsage: number;
  ramUsage: number;
  networkUsage: number;
}

interface DashboardProps {
  devices: Device[];
}

const Dashboard: React.FC<DashboardProps> = ({ devices }) => {
  const connectionStatus = devices.length > 0 ? "connected" : "disconnected";

  const handleConnect = async (deviceId: string) => {
    console.log(`Connecting to device: ${deviceId}`);
    try {
      // לוגיקת החיבור למכשיר
      const device = devices.find(d => d.id === deviceId);
      if (device) {
        // עדכון הסטטוס במידת הצורך
        useSystemStore.getState().updatedevice(
          devices.map(d => 
            d.id === deviceId 
              ? { ...d, status: 'online' } 
              : d
          )
        );
      }
    } catch (error) {
      console.error("Failed to connect to device:", error);
    }
  };

  const handleDetails = (deviceId: string) => {
    console.log(`Showing details for device: ${deviceId}`);
    // ניתן להוסיף כאן ניווט לדף פרטי המכשיר או פתיחת מודל
  };

  return (
    <div className="h-full bg-gray-100">
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <h1 className="text-sm font-medium">Network Dashboard</h1>
          </div>
        </div>

        <div className="p-4 border-b">
          {/* Connection Status */}
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

                  {/* Resource Usage */}
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

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-between gap-2">
                    <button
                      onClick={() => handleConnect(device.id)}
                      disabled={device.status === 'online'}
                      className={`flex-1 px-4 py-2 rounded transition-colors ${
                        device.status === 'online'
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {device.status === 'online' ? 'Connected' : 'Connect'}
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