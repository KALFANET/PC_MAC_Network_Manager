const express = require('express');
const cors = require('cors'); // הוספת תמיכה ב-CORS
const deviceRoutes = require('./routes/deviceRoutes');
const softwareRoutes = require('./routes/softwareRoutes');

const app = express();

// ✅ הוספת CORS כדי לאפשר גישה מה-Client
app.use(cors({
    origin: "http://localhost:3000", // מאפשר גישה מה-Frontend
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

// ✅ טיפול בשגיאות כלליות
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.stack);
    res.status(500).json({ message: "משהו השתבש בשרת!" });
});

// ✅ הפעלת השרת
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});