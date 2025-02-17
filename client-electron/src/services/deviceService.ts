import axios from 'axios';
import os from 'os';
import { networkInterfaces } from 'os';

export const registerDevice = async () => {
    const deviceData = {
        name: os.hostname(),
        ipAddress: getLocalIpAddress(),
        macAddress: getMacAddress(),
        status: "online"
    };

    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('http://localhost:4000/api/devices/register', deviceData, {
            headers: { 'Authorization': token }
        });
        console.log("Device registered:", response.data.device);
        return response.data.device;
    } catch (error: any) {
        console.error("Device registration failed:", error.response?.data?.message || error.message);
        return null;
    }
};

const getLocalIpAddress = (): string => {
    const interfaces = networkInterfaces();
    for (let iface of Object.values(interfaces)) {
        for (let entry of iface) {
            if (entry.family === 'IPv4' && !entry.internal) {
                return entry.address;
            }
        }
    }
    return 'Unknown';
};

const getMacAddress = (): string => {
    const interfaces = networkInterfaces();
for (const iface of Object.values(interfaces)) {
    if (iface) { // Add this check
        for (const entry of iface) {
            // ...
        }for (const iface of Object.values(interfaces)) { // Use const
    // ...
}

    }
}
for (const iface of Object.values(interfaces)) { // Use const
            if (entry.mac && entry.mac !== '00:00:00:00:00:00') {
                return entry.mac;
            }
        }
    }
    return 'Unknown';
};