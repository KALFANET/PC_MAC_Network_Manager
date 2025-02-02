require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// ברירת מחדל ל-API
app.get('/', (req, res) => {
    res.json({ message: '🚀 API עובד בהצלחה!' });
});
app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes); // 🔹 חיבור הנתיבים

// הפעלת השרת
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 שרת ה-Backend פועל על http://localhost:${PORT}`);
});
