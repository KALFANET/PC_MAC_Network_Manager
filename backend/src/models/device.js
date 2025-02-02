'use strict';

module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true
      }
    },
    status: {
      type: DataTypes.ENUM('online', 'offline', 'unknown'),
      defaultValue: 'unknown'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    tableName: 'Devices',
    timestamps: true,
    indexes: [
      { fields: ['userId'], name: 'idx_userId' } // ✅ הוספת אינדקס לביצועים
    ]
  });

  Device.associate = (models) => {
    Device.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); // ✅ שינוי users ל-user
  };

  return Device;
};