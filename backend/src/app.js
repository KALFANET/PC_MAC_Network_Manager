const express = require('express');
const cors = require('cors'); 
const os = require('os'); 
const deviceRoutes = require('./routes/deviceRoutes');
const softwareRoutes = require('./routes/softwareRoutes');

const app = express();

// ✅ הוספת CORS כדי לאפשר גישה מכל המחשבים ברשת
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middleware לטיפול בבקשות JSON
app.use(express.json());

// ✅ Middleware שמדפיס בקשות נכנסות כדי לאבחן בעיות
app.use((req, res, next) => {
    console.log(`📥 Received request: ${req.method} ${req.url}`);
    next();
});

// ✅ ניהול מכשירים
app.use('/api/devices', deviceRoutes);

// ✅ התקנת תוכנות מרחוק
app.use('/api/software', softwareRoutes);

// 📌 פונקציה למציאת כתובת ה-IP האמיתית של המחשב ברשת
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    let localIP = 'localhost';

    for (const name in interfaces) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                localIP = net.address;
                break;
            }
        }
    }
    return localIP;
}

// ✅ API חדש שמחזיר את כתובת ה-Backend לכל רכיב שמבקש
app.get('/api/server-ip', (req, res) => {
    const serverIp = getLocalIP();
    res.json({ serverIp });
    console.log(`📡 Server IP sent: ${serverIp}`);
});

// ✅ הפעלת השרת על `0.0.0.0` כדי לאפשר גישה מכל מחשב ברשת
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log(`🚀 Server running on:
    - Local:   http://localhost:${PORT}
    - Network: http://${localIP}:${PORT}`);
});