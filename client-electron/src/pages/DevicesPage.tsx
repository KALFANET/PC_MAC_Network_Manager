import React, { useEffect, useState } from "react";
import useSystemStore from "../store"; // ✅ שימוש בסטור (אם צריך)
import endpoints from "../services/api"; // ✅ ייבוא נכון של `endpoints`

const DevicesPage: React.FC = () => {
  const { updateDevices, devices } = useSystemStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await endpoints.fetchDevices();

        if (!response || !response.devices) {
          throw new Error("No devices found.");
        }

        updateDevices(response.devices);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
        setError("Unable to load devices.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [updateDevices]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Devices</h1>

      {isLoading && <p className="text-gray-500">Loading devices...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.length > 0 ? (
          devices.map((device) => (
            <div key={device.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{device.name}</h2>
              <p className={device.status === "online" ? "text-green-500" : "text-red-500"}>
                {device.status === "online" ? "Online" : "Offline"}
              </p>
            </div>
          ))
        ) : (
          !isLoading && <p className="text-gray-500">No devices available.</p>
        )}
      </div>
    </div>
  );
};

export default DevicesPage;