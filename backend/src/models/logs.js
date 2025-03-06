'use strict';

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    deviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Devices', // ✅ לוודא שזה שם הטבלה הנכון!
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

  // ✅ הוספת קשרים בין הטבלאות
  Log.associate = (models) => {
    Log.belongsTo(models.Device, { foreignKey: 'deviceId', as: 'device' });
  };

  return Log;
};