import React, { useEffect, useState } from "react";
import { endpoints } from "../services/api";


interface DevicesPageProps {
  devices: Device[];
}

interface Device {
  id: string;
  name: string;
  status: string;
  cpuUsage: number;
  ramUsage: number;
  networkUsage: number;
}
const DevicesPage: React.FC<DevicesPageProps> = ({ devices: initialDevices }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [devices, setDevice] = useState<Device[]>(initialDevices);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await endpoints.fetchDevices();
        setDevice(response);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
        setError("Unable to load devices.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Devices</h1>

      {isLoading && <p>Loading devices...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div key={device.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{device.name}</h2>
            <p className={device.status === "online" ? "text-green-500" : "text-red-500"}>
              {device.status === "online" ? "Online" : "Offline"}
            </p>
            <div className="flex gap-4">
              <div>
                <div className="text-sm">CPU</div>
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${device.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="text-sm">RAM</div>
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${device.ramUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Connect</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;