// src/middlewares/deviceAuth.js
const jwt = require('jsonwebtoken');
const { Device } = require('../models');
require('dotenv').config();

exports.authenticateDevice = async (req, res, next) => {
    try {
        console.log("\n=== Device Authentication Process ===");
        const token = req.header('Authorization');
        console.log("📥 Received authorization header:", token);

        if (!token) {
            console.log("❌ No authorization header found");
            return res.status(401).json({ message: 'גישה נדחתה! טוקן חסר' });
        }

        // הסרת ה-Bearer prefix
        const cleanToken = token.replace('Bearer ', '');
        console.log("🔍 Processing token:", cleanToken.substring(0, 20) + "...");

        // בדיקה אם זה API key
        const deviceByApiKey = await Device.findOne({ 
            where: { apiKey: cleanToken },
            attributes: ['id', 'name', 'status', 'macAddress', 'ipAddress', 'os']
        });

        if (deviceByApiKey) {
            console.log("✅ Successfully authenticated via API key");
            console.log(`📱 Device details: ID=${deviceByApiKey.id}, Name=${deviceByApiKey.name}, Status=${deviceByApiKey.status}`);
            req.device = deviceByApiKey;
            
            // בדיקת סטטוס מכשיר
            if (deviceByApiKey.status !== 'online') {
                await deviceByApiKey.update({ status: 'online' });
                console.log("📡 Updated device status to online");
            }
            
            return next();
        }

        console.log("ℹ️ Token is not an API key, attempting JWT verification");

        try {
            const verified = jwt.verify(cleanToken, process.env.SECRET_KEY);
            console.log("🔐 JWT verification result:", verified);

            const device = await Device.findOne({ 
                where: { id: verified.deviceId },
                attributes: ['id', 'name', 'status', 'macAddress', 'ipAddress', 'os']
            });

            if (!device) {
                console.log("❌ No device found for JWT payload");
                return res.status(403).json({ message: 'מכשיר לא מאומת!' });
            }

            console.log("✅ Successfully authenticated via JWT");
            req.device = device;
            next();
        } catch (jwtError) {
            console.error("❌ JWT verification failed:", {
                error: jwtError.message,
                tokenType: typeof cleanToken,
                tokenLength: cleanToken.length
            });
            return res.status(403).json({ message: 'טוקן לא תקף!' });
        }
    } catch (error) {
        console.error("❌ Authentication error:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ message: 'שגיאה באימות המכשיר' });
    }
};

// הוספת פונקציית עזר לבדיקת תוקף הטוקן
exports.validateToken = (token) => {
    console.log("\n=== Token Validation ===");
    
    // בדיקה אם זה API key (64 תווים hex)
    const isApiKey = /^[a-f0-9]{64}$/.test(token);
    console.log("Is API key format:", isApiKey);
    
    // בדיקה אם זה JWT (xxx.yyy.zzz)
    const isJWT = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token);
    console.log("Is JWT format:", isJWT);
    
    return { isApiKey, isJWT };
};