'use strict';

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Logs', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    deviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Devices', // ✅ הגדרת deviceId כמפתח זר לטבלת Devices
        key: 'id'
      }
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, 
  {
    tableName: 'Logs',
    timestamps: true
  });

  return Log;
};