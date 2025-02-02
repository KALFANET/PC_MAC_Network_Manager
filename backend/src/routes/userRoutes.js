const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // ייבוא תקין
const { authenticateToken } = require('../middlewares/authMiddleware'); // ייבוא ה-Middleware

router.post('/register', userController.register);
router.post('/login', userController.login);

// 🔹 נתיב שמצריך אימות (// 🔹 נתיב שמצריך אימות (Protected Route)Protected Route)
router.get('/me', authenticateToken, (req, res) => {
    res.json({ message: 'גישה מאושרת!', user: req.user });
});

module.exports = router;