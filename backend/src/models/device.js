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
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /**
     * The userId field represents the unique identifier of the user associated with the device.
     * It is a UUID type and is required, with a reference to the 'id' field in the 'users' table.
     */
  userId: {
  type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: 'users',
    key: 'id'
  }
}
  }, 
  {
    tableName: 'Devices',
    timestamps: true
  });

  Device.associate = (models) => {
    Device.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Device;
};