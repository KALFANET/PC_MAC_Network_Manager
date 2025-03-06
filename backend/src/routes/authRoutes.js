const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 📌 קבלת טוקן על בסיס API Key (מחזיר את אותו API Key ולא יוצר חדש)
router.post('/token', authController.getAuthToken);

module.exports = router;