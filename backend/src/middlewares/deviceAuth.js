const { Device } = require('../models');

/**
 * קבלת טוקן מבוסס API Key
 */
exports.getAuthToken = async (req, res) => {
    try {
        console.log("\n=== 🔐 API Key Authentication Start ===");

        const { apiKey } = req.body;

        if (!apiKey) {
            console.log("❌ Missing API Key in request!");
            return res.status(400).json({ message: "חסר API Key בבקשה!" });
        }

        // 🔎 חיפוש מכשיר עם API Key מתאים
        const device = await Device.findOne({ where: { apiKey } });

        if (!device) {
            console.log("❌ No device found for this API Key!");
            return res.status(403).json({ message: "API Key לא תקף!" });
        }

        console.log(`✅ API Key valid for device: ${device.idKey} (${device.name})`);
        
        // 📌 החזרת ה-API Key ללא שינויים
        return res.status(200).json({ apiKey: device.apiKey });

    } catch (error) {
        console.error("❌ Error in getAuthToken:", error.message);
        return res.status(500).json({ message: "שגיאה בקבלת הטוקן", error: error.message });
    }
};