'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Logs', 'deviceId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Devices',  // ✅ חיבור ל-Devices
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Logs', 'deviceId', {
      type: Sequelize.UUID,
      allowNull: true
    });
  }
};