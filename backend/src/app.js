require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
const db = require('./models');

db.sequelize.sync({ alter: true })
  .then(() => console.log("📦 Models synchronized successfully"))
  .catch(err => console.error("❌ Error synchronizing models:", err));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// נתיב שמטפל בכל פעולות המכשירים

app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/system-status', userRoutes);
app.get('/', (req, res) => {
  res.json({ message: '🚀 API עובד בהצלחה!' });
});
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 שרת ה-Backend פועל על http://localhost:${PORT}`);
  });
}

module.exports = app; // 📌 ייצוא האפליקציה לבדיקה