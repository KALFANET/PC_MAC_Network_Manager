const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, deviceController.createDevice);
router.get('/', authenticateToken, deviceController.getDevices);
router.get('/:id', authenticateToken, deviceController.getDeviceById);
router.put('/:id', authenticateToken, deviceController.updateDevice);
router.delete('/:id', authenticateToken, deviceController.deleteDevice);

module.exports = router;