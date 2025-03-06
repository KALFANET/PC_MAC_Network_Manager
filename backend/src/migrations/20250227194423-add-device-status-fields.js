'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Devices');

    return Promise.all([
      queryInterface.addColumn('Devices', 'lastCommandTime', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.addColumn('Devices', 'lastCommandStatus', {
        type: Sequelize.ENUM('success', 'failure'),
        allowNull: true
      }),
      tableInfo.lastSeen ? Promise.resolve() : queryInterface.addColumn('Devices', 'lastSeen', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Devices', 'lastCommandTime'),
      queryInterface.removeColumn('Devices', 'lastCommandStatus')
    ]);
  }
};