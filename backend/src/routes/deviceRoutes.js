const express = require('express');
const deviceController = require('../controllers/deviceController'); // ✅ וידוא ייבוא תקין
const { authenticateDevice } = require('../middlewares/deviceAuth');

const router = express.Router();

// ✅ בדיקה אם הפונקציות קיימות
if (!deviceController.autoRegisterDevice) {
    console.error("❌ ERROR: deviceController.autoRegisterDevice is undefined!");
}

// ✅ רישום מכשירים אוטומטי בעת התקנה
router.post('/register', deviceController.autoRegisterDevice);

// ✅ חידוש טוקן למכשיר
router.post('/refresh-token', authenticateDevice, deviceController.refreshToken);

// ✅ קבלת רשימת המכשירים
router.get('/', deviceController.getDevices);

// ✅ מחיקת מכשיר
router.delete('/:deviceId', deviceController.deleteDevice);

// ✅ שליחת פקודות מהמכשיר ל-Backend
router.post('/command', authenticateDevice, deviceController.executeCommand);

// ✅ התקנת תוכנה מרחוק
router.post('/install', authenticateDevice, deviceController.installSoftware);

// ✅ שליפת סטטוס של מכשיר לפי ID
router.get('/status/:deviceId', authenticateDevice, deviceController.getDeviceStatus);

// ✅ עדכון נתוני מכשיר
router.put('/update/:deviceId', authenticateDevice, deviceController.updateDevice);

module.exports = router;