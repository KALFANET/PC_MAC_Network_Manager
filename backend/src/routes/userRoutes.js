const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // ייבוא תקין
const { authenticateToken } = require('../middlewares/authMiddleware'); // ייבוא ה-Middleware
const systemStatusController = require('../controllers/systemStatusController'); // הוספת פונקציה למצב המערכת

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticateToken, userController.getProfile);

// 🔹 נתיב שמצריך אימות (Protected Route)
router.get('/me', authenticateToken, (req, res) => {
    res.json({ message: 'גישה מאושרת!', user: req.user });
    app.use('/api/devices', deviceRoutes);

});
router.get('/system-status', userController.getSystemStatus);

module.exports = router;