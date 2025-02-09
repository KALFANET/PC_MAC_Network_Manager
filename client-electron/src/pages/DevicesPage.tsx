import React, { useEffect, useState } from "react";
import useSystemStore from "../store";
import { endpoints } from "../services/api";

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<{ id: string; name: string; status: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setError(null);
        const response = await endpoints.fetchDevices();
        setDevices(response.devices);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
        setError("Unable to load devices.");
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Devices</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div key={device.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{device.name}</h2>
            <p className={device.status === "online" ? "text-green-500" : "text-red-500"}>
              {device.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;