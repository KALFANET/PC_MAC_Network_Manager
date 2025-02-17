'use strict';

module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    macAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    os: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, 
  {
    tableName: 'Devices',
    timestamps: true
  });

  return Device;
};