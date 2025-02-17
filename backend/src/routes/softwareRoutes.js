const express = require('express');
const { installSoftware } = require('../controllers/softwareController');

const router = express.Router();

// התקנת תוכנה מרחוק
router.post('/install', installSoftware);

module.exports = router;