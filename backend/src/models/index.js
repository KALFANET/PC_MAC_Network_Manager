const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// טוען רק קבצי מודלים (לא index.js או קבצים אחרים)
fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    if (typeof model === 'function') {
      db[model(sequelize, DataTypes).name] = model(sequelize, DataTypes);
    }
  });

// יצירת אסוציאציות בין המודלים
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;