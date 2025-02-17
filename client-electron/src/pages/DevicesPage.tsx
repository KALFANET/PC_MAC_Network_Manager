import { useEffect, useState } from 'react';
import { registerDevice } from '../services/deviceService';
import axios from 'axios';

const DevicesPage = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        registerDevice().then(() => {
            axios.get('/api/devices')
                .then(response => setDevices(response.data.devices))
                .catch(error => console.error("Error fetching devices:", error));
        });
    }, []);

    return (
        <div>
            <h2>Devices Management</h2>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>
                        {device.name} - {device.ipAddress} - {device.macAddress} ({device.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DevicesPage;