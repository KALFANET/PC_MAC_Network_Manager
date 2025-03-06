module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ יצירת UUID אוטומטית
      primaryKey: true
    },
    idKey: { // 🔹 המזהה החלופי שהוספנו
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    macAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    os: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('online', 'offline'),
      defaultValue: 'offline'
    },
    lastSeen: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    lastCommandTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastCommandStatus: {
      type: DataTypes.ENUM('success', 'failure'),
      allowNull: true
    }
  });

  return Device;
};