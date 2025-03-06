const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

// ✅ רישום מכשירים אוטומטי בעת התקנה
router.post('/register', deviceController.autoRegisterDevice);

// ✅ שליפת רשימת המכשירים
router.get('/', deviceController.getDevices);

// ✅ מחיקת מכשיר מהרשת
router.delete('/:idKey', deviceController.deleteDevice);

// ✅ שליחת פקודות מהמכשיר ל-Backend
router.post('/command', deviceController.executeCommand);

// ✅ התקנת תוכנה מרחוק
router.post('/install', deviceController.installSoftware);

// ✅ שליפת סטטוס של מכשיר לפי מזהה (`idKey`)
router.get('/status/:idKey', deviceController.getDeviceStatus);

// ✅ עדכון סטטוס מכשיר (Online/Offline)
router.put('/status/:idKey', deviceController.updateDeviceStatus);

// ✅ עדכון נתוני מכשיר (לדוגמה: כתובת IP, שם מכשיר)
router.put('/update/:idKey', deviceController.updateDevice);

module.exports = router;