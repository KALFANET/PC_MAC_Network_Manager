const jwt = require('jsonwebtoken');
const { Device } = require('../models');
require('dotenv').config();

exports.getAuthToken = async (req, res) => {
    try {
        const { apiKey } = req.body;
        if (!apiKey) {
            console.log("❌ API Key missing in request!");
            return res.status(400).json({ success: false, message: 'API Key is required' });
        }

        console.log(`🔍 Searching for device with API Key: ${apiKey}`);
        const device = await Device.findOne({ where: { apiKey } });

        if (!device) {
            console.log("❌ No device found with the provided API Key!");
            return res.status(403).json({ success: false, message: 'Invalid API Key' });
        }

        // ✅ יצירת JWT
        console.log("🔑 Generating JWT for device:", device.id);
        const token = jwt.sign({ deviceId: device.id }, process.env.SECRET_KEY, { expiresIn: '7d' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("❌ Error generating token:", error.message);
        res.status(500).json({ success: false, message: 'Error generating token' });
    }
};