const express = require('express');
const router = express.Router();
const { getAvailableNetworks, getNetworkStatus, setNetworkConfig, disconnectNetwork } = require('../controllers/networkController');

router.get('/available', getAvailableNetworks);
router.get('/status', getNetworkStatus);
router.post('/configure', setNetworkConfig);
router.post('/disconnect', disconnectNetwork);

module.exports = router;
