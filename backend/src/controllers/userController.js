const db = require('../models');
const { User } = db;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'משתמש נוצר בהצלחה!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בעת יצירת משתמש', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login error', error: error.message });
    }
};
exports.getSystemStatus = async (req, res) => {
    try {
        // בדוק אם החיבור למסד נתונים פעיל
        await db.sequelize.authenticate();
        
        // אם החיבור למסד נתונים תקין
        res.json({
            message: 'המערכת פועלת כראוי',
            status: 'online',
            database: 'connected',
            timestamp: new Date(),
        });
    } catch (error) {
        // אם יש בעיה בחיבור למסד נתונים
        console.error('❌ שגיאה בחיבור למסד הנתונים:', error.message);
        res.status(500).json({
            message: 'המערכת לא פועלת כראוי',
            status: 'offline',
            database: 'disconnected',
            timestamp: new Date(),
        });
    }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // מזהה המשתמש מהטוקן
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email'] // השדות שנרצה להחזיר
    });
    if (!user) {
      return res.status(404).json({ message: 'משתמש לא נמצא' });
    }
    res.json(user);
  } catch (error) {
    console.error('שגיאה בשליפת פרופיל המשתמש:', error);
    res.status(500).json({ message: 'שגיאת שרת' });
  }
};