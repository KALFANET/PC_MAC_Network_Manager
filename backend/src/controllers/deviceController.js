const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Device, Log } = require('../models'); // ✅ טעינת מודלים ממקור אחד
const { exec } = require('child_process');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

console.log("🔍 deviceController.js loaded");

// ✅ רישום מכשיר חדש
exports.autoRegisterDevice = async (req, res) => {
    try {
        console.log("📥 Received registration request:", req.body);

        const { idKey, name, ipAddress, macAddress, os, osVersion, cpu, memory, platform } = req.body;

        if (!idKey || !macAddress || !ipAddress || !name || !os) {
            console.error("❌ Missing device details:", req.body);
            return res.status(400).json({ message: "Missing device details" });
        }

        let device = await Device.findOne({ where: { idKey } });

        if (!device) {
            const newId = uuidv4();
            const newApiKey = crypto.randomBytes(32).toString('hex');

            device = await Device.create({
                id: newId,
                idKey,
                name,
                ipAddress,
                macAddress,
                os,
                osVersion,
                cpu,
                memory,
                platform,
                apiKey: newApiKey,
                status: 'offline',
                lastCommandTime: null,
                lastCommandStatus: null,
                lastSeen: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } else {
            await device.update({
                ipAddress,
                status: 'online',
                lastSeen: new Date(),
                updatedAt: new Date()
            });
        }

        console.log("✅ Device registered successfully:", device);
        res.status(200).json({ message: 'Device registered successfully', apiKey: device.apiKey });
    } catch (error) {
        console.error("❌ Error registering device:", error.message);
        res.status(500).json({ message: 'Error registering device', error: error.message });
    }
};

// ✅ שליפת כל המכשירים
exports.getDevices = async (req, res) => {
    try {
        console.log("📥 Fetching devices list");

        const devices = await Device.findAll({
            attributes: ['id', 'idKey', 'name', 'ipAddress', 'macAddress', 'os', 'apiKey', 'status', 'createdAt', 'updatedAt', 'lastCommandTime', 'lastCommandStatus', 'lastSeen']
        });

        res.status(200).json(devices);
    } catch (error) {
        console.error("❌ Error fetching devices:", error.message);
        res.status(500).json({ message: 'Error fetching devices', error: error.message });
    }
};

// ✅ שליחת פקודות מהמכשיר ל-Backend
exports.executeCommand = async (req, res) => {
    console.log("📌 Received executeCommand request:", req.body);

    try {
        const { command, idKey } = req.body;

        if (!command || !idKey) {
            return res.status(400).json({ message: "Command and idKey are required" });
        }

        const device = await Device.findOne({ where: { idKey } });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        exec(command, async (error, stdout, stderr) => {
            let status = error ? 'failure' : 'success';
            if (error) {
                console.error(`❌ Command execution failed on device ${idKey}:`, stderr);
                return res.status(500).json({ message: "Error executing command", error: stderr });
            }

            await device.update({
                lastCommandTime: new Date(),
                lastCommandStatus: status
            });

            if (Log) {
                await Log.create({
                    deviceId: device.id,
                    action: 'Command Executed',
                    details: command,
                    status
                });
            }

            console.log(`✅ Command executed successfully on device ${idKey}`);
            res.status(200).json({ output: stdout, status });
        });

    } catch (error) {
        console.error("❌ Error executing command:", error.message);
        res.status(500).json({ message: 'Error executing command', error: error.message });
    }
};

// ✅ התקנת תוכנה מרחוק (שוחזר!)

exports.installSoftware = async (req, res) => {
    try {
        console.log("📥 Request to install software:", req.body);

        const { idKey, softwareUrl, os } = req.body;

        if (!idKey || !softwareUrl || !os) {
            return res.status(400).json({ message: "Missing parameters: idKey, softwareUrl, and os are required" });
        }

        // 🔍 שליפת המכשיר מהמסד נתונים לפי `idKey`
        const device = await Device.findOne({ where: { idKey } });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        console.log(`📡 Preparing installation on ${idKey} (${os}) from ${softwareUrl}...`);

        // 🎯 ולידציה נוספת למערכת ההפעלה
        const osLower = os.toLowerCase();
        if (osLower !== "macos" && osLower !== "windows") {
            return res.status(400).json({ message: "Unsupported operating system" });
        }

        // 📌 יצירת פקודת התקנה לפי מערכת ההפעלה
        let installCommand;
        if (osLower === "macos") {
            installCommand = `
                curl -o /tmp/software.pkg "${softwareUrl}" &&
                sudo installer -pkg /tmp/software.pkg -target /
            `;
        } else if (osLower === "windows") {
            installCommand = `
                powershell -Command "Invoke-WebRequest -Uri '${softwareUrl}' -OutFile 'C:\\Temp\\software.msi';
                Start-Process -FilePath 'msiexec.exe' -ArgumentList '/i C:\\Temp\\software.msi /quiet /norestart' -Wait"
            `;
        }

        // 🚀 ביצוע הפקודה
        exec(installCommand, async (error, stdout, stderr) => {
            let status = error ? 'failure' : 'success';

            if (error) {
                console.error(`❌ Software installation failed on device ${idKey}:`, stderr);
                return res.status(500).json({ message: "Error installing software", error: stderr });
            }

            // 📌 שמירת לוג התקנה
            if (Log) {
                await Log.create({
                    deviceId: device.id,
                    action: 'Software Installed',
                    details: softwareUrl,
                    status
                });
            }

            console.log(`✅ Software installed successfully on device ${idKey}`);
            res.status(200).json({ message: "Software installed successfully", output: stdout, status });
        });

    } catch (error) {
        console.error("❌ Error processing installation request:", error.message);
        res.status(500).json({ message: 'Error processing installation request', error: error.message });
    }
};
// ✅ חידוש טוקן (שוחזר!)
exports.refreshToken = async (req, res) => {
    try {
        console.log("📥 Received token refresh request:", req.device);

        const { idKey } = req.device;
        const newToken = jwt.sign({ idKey }, process.env.SECRET_KEY, { expiresIn: '7d' });

        if (Log) {
            await Log.create({
                deviceId: req.device.id,
                action: 'Token Refreshed',
                details: 'New token issued'
            });
        }

        res.status(200).json({ token: newToken });
    } catch (error) {
        console.error("❌ Error refreshing token:", error.message);
        res.status(500).json({ message: 'Error refreshing token', error: error.message });
    }
};
// ✅ מחיקת מכשיר מהרשת
exports.deleteDevice = async (req, res) => {
    try {
        console.log("📥 Deleting device:", req.params);

        const { idKey } = req.params;
        const device = await Device.findOne({ where: { idKey } });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        await Device.destroy({ where: { idKey } });

        if (Log) {
            await Log.create({
                deviceId: device.id,
                action: 'Device Deleted',
                details: 'Device removed from system'
            });
        }

        console.log(`✅ Device ${idKey} removed successfully`);
        res.status(200).json({ message: "Device removed successfully" });
    } catch (error) {
        console.error("❌ Error deleting device:", error.message);
        res.status(500).json({ message: 'Error deleting device', error: error.message });
    }
};
exports.updateDevice = async (req, res) => {
    try {
        console.log("📥 Updating device:", req.params, req.body);

        const { idKey } = req.params;
        const updateData = req.body;
        
        // 🔹 שדות שמותר לעדכן
        const allowedFields = ['name', 'ipAddress', 'osVersion', 'cpu', 'memory', 'platform'];
        
        // 🔹 סינון שדות לא מורשים
        const filteredData = {};
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                filteredData[field] = updateData[field];
            }
        }
        
        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: "No valid fields to update" });
        }

        const device = await Device.findOne({ where: { idKey } });
        
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        await device.update(filteredData);
        
        if (Log) {
            await Log.create({ 
                deviceId: device.id, 
                action: 'Device Updated', 
                details: JSON.stringify(filteredData) 
            });
        }

        console.log(`✅ Device ${idKey} updated successfully`);
        res.status(200).json({ message: "Device updated successfully", device });
    } catch (error) {
        console.error("❌ Error updating device:", error.message);
        res.status(500).json({ message: 'Error updating device', error: error.message });
    }
};
exports.updateDeviceStatus = async (req, res) => {
    try {
        console.log("📥 Updating device status:", req.params);

        const { idKey } = req.params;
        const { status } = req.body;
        
        if (!status || !['online', 'offline'].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be 'online' or 'offline'" });
        }

        const device = await Device.findOne({ where: { idKey } });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        await device.update({ 
            status,
            lastSeen: new Date()
        });

        console.log(`✅ Device ${idKey} status updated to ${status}`);
        res.status(200).json({ message: `Status updated to ${status}` });
    } catch (error) {
        console.error("❌ Error updating device status:", error.message);
        res.status(500).json({ message: 'Error updating device status', error: error.message });
    }
};
exports.getDeviceStatus = async (req, res) => {
    try {
        console.log("📥 Fetching device status:", req.params);

        const { idKey } = req.params;
        const device = await Device.findOne({ where: { idKey } });

        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        res.status(200).json({ status: device.status });
    } catch (error) {
        console.error("❌ Error fetching device status:", error.message);
        res.status(500).json({ message: 'Error fetching device status', error: error.message });
    }
};