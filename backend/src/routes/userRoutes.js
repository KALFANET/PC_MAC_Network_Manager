const express = require('express');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

// קבלת רשימת משתמשים (לשימוש המנהל בלבד)
router.get('/', getUsers);

module.exports = router;
