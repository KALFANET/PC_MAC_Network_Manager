const db = require('../models');
const { Device } = db;

exports.createDevice = async (req, res) => {
    try {
        const { name, ipAddress, status, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const newDevice = await db.Device.create({
            name,
            ipAddress,
            status: status || 'unknown',
            userId
        });

        return res.status(201).json({ message: 'Device created successfully', device: newDevice });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating device', error: error.message });
    }
};

exports.getDevices = async (req, res) => {
    try {
        const devices = await Device.findAll({ where: { userId: req.user.id } });
        res.json(devices);
    } catch (error) {
        console.error("❌ שגיאה בשליפת מחשבים:", error);
        res.status(500).json({ message: "שגיאה בשליפת מחשבים", error: error.message });
    }
};

exports.getDeviceById = async (req, res) => {
    try {
        const device = await device.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!device) return res.status(404).json({ message: "מחשב לא נמצא" });
        res.json(device);
    } catch (error) {
        console.error("❌ שגיאה בשליפת מחשב:", error);
        res.status(500).json({ message: "שגיאה בשליפת מחשב", error: error.message });
    }
};

exports.updateDevice = async (req, res) => {
    try {
        const { name, ip, status } = req.body;
        const device = await Device.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!device) return res.status(404).json({ message: "מחשב לא נמצא" });

        await device.update({ name, ip, status });
        res.json(device);
    } catch (error) {
        console.error("❌ שגיאה בעדכון מחשב:", error);
        res.status(500).json({ message: "שגיאה בעדכון מחשב", error: error.message });
    }
};

exports.deleteDevice = async (req, res) => {
    try {
        const device = await Device.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!device) return res.status(404).json({ message: "מחשב לא נמצא" });

        await device.destroy();
        res.json({ message: "המחשב נמחק בהצלחה" });
    } catch (error) {
        console.error("❌ שגיאה במחיקת מחשב:", error);
        res.status(500).json({ message: "שגיאה במחיקת מחשב", error: error.message });
    }
};