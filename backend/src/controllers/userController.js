const db = require('../models');
/* `const User = db.User;` is importing the User model from the database connection (`db`) and
assigning it to the variable `User`. This allows the code to interact with the User model, such as
creating new users in the `register` function and querying users in the `login` function. */
/* `const User = db.User;` is importing the User model from the `db` object. This line allows you to
access the User model defined in the `models` module and use it within the current file for
operations such as creating new users in the database. */
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