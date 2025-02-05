const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {}; // יצירת אובייקט ריק למודלים

db.sequelize = sequelize;
db.User = require('./user')(sequelize, DataTypes);
db.Device = require('./device')(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;