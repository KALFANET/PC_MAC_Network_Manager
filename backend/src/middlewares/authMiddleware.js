const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'גישה נדחתה! טוקן חסר' });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // שמירת פרטי המשתמש בבקשה
        next();
    } catch (error) {
        res.status(403).json({ message: 'טוקן לא תקף!' });
    }
};