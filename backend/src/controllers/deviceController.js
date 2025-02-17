const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Device, Log } = require('../models'); // ✅ טוען מודלים ממקור אחד
const { exec } = require('child_process');
require('dotenv').config();

console.log("🔍 deviceController.js loaded");

// ✅ רישום מכשיר חדש
exports.autoRegisterDevice = async (req, res) => {
    try {
        console.log("📥 Received registration request:", req.body);

        const { macAddress, name, ipAddress, os, deviceId, platform, osVersion, cpu, memory } = req.body;

        // 📌 בדיקה אם חסרים נתונים
        if (!macAddress || !ipAddress || !name || !os || !deviceId || !platform || !osVersion || !cpu || !memory) {
            console.error("❌ Missing device details:", req.body);
            return res.status(400).json({ message: "Missing device details" });
        }

        let device = await Device.findOne({ where: { macAddress } });

        if (!device) {
            const apiKey = crypto.randomBytes(32).toString('hex');

            device = await Device.create({
                macAddress,
                name,
                ipAddress,
                os,
                deviceId,
                platform,
                osVersion,
                cpu,
                memory,
                status: 'online',
                apiKey
            });
        } else {
            await device.update({ ipAddress, status: 'online' });
        }

        const token = jwt.sign({ deviceId: device.id }, process.env.SECRET_KEY, { expiresIn: '7d' });
        console.log("🔑 Generated Token:", token);
        if (Log) {
            await Log.create({ deviceId: device.id, action: 'Device Registered', details: JSON.stringify(req.body) });
        }

        console.log("✅ Device registered successfully:", device, token);
        res.status(200).json({ message: 'Device registered successfully', device, apiKey: device.apiKey, token });
    } catch (error) {
        console.error("❌ Error registering device:", error.message);
        res.status(500).json({ message: 'Error registering device', error: error.message });
    }
};

// ✅ חידוש טוקן למכשיר
exports.refreshToken = async (req, res) => {
    try {
        console.log("📥 Received token refresh request:", req.device);

        const { deviceId } = req.device;
        const newToken = jwt.sign({ deviceId }, process.env.SECRET_KEY, { expiresIn: '7d' });

        if (Log) {
            await Log.create({ deviceId, action: 'Token Refreshed', details: 'New token issued' });
        }

        res.status(200).json({ token: newToken });
    } catch (error) {
        console.error("❌ Error refreshing token:", error.message);
        res.status(500).json({ message: 'Error refreshing token', error: error.message });
    }
};

// ✅ שליפת כל המכשירים
exports.getDevices = async (req, res) => {
    try {
        console.log("📥 Fetching devices list");

        const devices = await Device.findAll({
            attributes: ['id', 'macAddress', 'name', 'ipAddress', 'os', 'status', 'createdAt', 'updatedAt']
        });

        res.status(200).json({ devices });
    } catch (error) {
        console.error("❌ Error fetching devices:", error.message);
        res.status(500).json({ message: 'Error fetching devices', error: error.message });
    }
};

// ✅ מחיקת מכשיר מהרשת
exports.deleteDevice = async (req, res) => {
    try {
        console.log("📥 Deleting device:", req.params);

        const { deviceId } = req.params;
        const device = await Device.findByPk(deviceId);

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        await Device.destroy({ where: { id: deviceId } });

        if (Log) {
            await Log.create({ deviceId, action: 'Device Deleted', details: 'Device removed from system' });
        }

        res.status(200).json({ message: 'Device removed successfully' });
    } catch (error) {
        console.error("❌ Error deleting device:", error.message);
        res.status(500).json({ message: 'Error deleting device', error: error.message });
    }
};

// ✅ שליחת פקודות מהמכשיר ל-Backend
exports.executeCommand = async (req, res) => {
    console.log("📥 Received command request headers:", req.headers);

    try {
        const { command } = req.body;
        if (!command) {
            return res.status(400).json({ message: "Command is required" });
        }

        // בדיקת אימות באמצעות ה-API Key
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized - No API Key" });
        }

        const apiKey = authHeader.replace("Bearer ", "");
        const device = await Device.findOne({ where: { apiKey } });

        if (!device) {
            return res.status(403).json({ message: "Invalid API Key" });
        }

        console.log(`📡 Executing command '${command}' on device ${device.id}`);

        exec(command, async (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ message: "Error executing command", error: stderr });
            }

            // ✅ רישום הלוגים עם deviceId תקין
            await Log.create({
                deviceId: device.id,  // ✅ שמירת ה-deviceId הנכון
                action: 'Command Executed',
                details: command
            });

            res.status(200).json({ output: stdout });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error executing command', error: error.message });
    }
};
// ✅ התקנת תוכנה מרחוק
exports.installSoftware = async (req, res) => {
    try {
        console.log("📥 Installing software:", req.body);

        const { softwareUrl } = req.body;
        if (!softwareUrl) {
            return res.status(400).json({ message: "Software URL is required" });
        }

        exec(`curl -O ${softwareUrl} && sudo installer -pkg ${softwareUrl} -target /`, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ message: "Error installing software", error: stderr });
            }

            if (Log) {
                Log.create({ deviceId: req.device.deviceId, action: 'Software Installed', details: softwareUrl });
            }

            res.status(200).json({ message: "Software installed successfully", output: stdout });
        });
    } catch (error) {
        console.error("❌ Error installing software:", error.message);
        res.status(500).json({ message: 'Error installing software', error: error.message });
    }
};

// ✅ שליפת סטטוס של מכשיר
exports.getDeviceStatus = async (req, res) => {
    try {
        console.log("📥 Fetching device status:", req.params);

        const { deviceId } = req.params;
        const device = await Device.findByPk(deviceId);

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        res.status(200).json({ status: device.status });
    } catch (error) {
        console.error("❌ Error fetching device status:", error.message);
        res.status(500).json({ message: 'Error fetching device status', error: error.message });
    }
};

// ✅ עדכון פרטי מכשיר
exports.updateDevice = async (req, res) => {
    try {
        console.log("📥 Updating device:", req.body);

        const { deviceId } = req.params;
        const { name, status } = req.body;

        const device = await Device.findByPk(deviceId);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        await device.update({ name, status });

        if (Log) {
            Log.create({ deviceId, action: 'Device Updated', details: JSON.stringify(req.body) });
        }

        res.status(200).json({ message: "Device updated successfully", device });
    } catch (error) {
        console.error("❌ Error updating device:", error.message);
        res.status(500).json({ message: 'Error updating device', error: error.message });
    }
};