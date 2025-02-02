'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    }
  }, {
    tableName: 'Users',
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.Device, { foreignKey: 'userId', as: 'devices' });
  };

  return User;
};