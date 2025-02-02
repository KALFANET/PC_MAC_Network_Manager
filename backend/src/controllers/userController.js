const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const user = db.users; 
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "חובה למלא שם משתמש, אימייל וסיסמה" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.json({ message: 'משתמש נרשם בהצלחה!', user });
    } catch (error) {
        console.error("❌ שגיאה בעת יצירת משתמש:", error);
        res.status(500).json({ message: 'שגיאה בעת יצירת משתמש', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error("❌ שגיאה בעת ההתחברות:", error);
        res.status(500).json({ message: 'שגיאה בעת ההתחברות', error: error.message });
    }
};