const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {}; // יצירת אובייקט ריק למודלים

db.sequelize = sequelize;
db.Device = require('./device')(sequelize, DataTypes);
db.Log = require('./logs')(sequelize, DataTypes);

// ✅ תיקון ייבוא המודלים והוספת אסוציאציות אם קיימות
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;