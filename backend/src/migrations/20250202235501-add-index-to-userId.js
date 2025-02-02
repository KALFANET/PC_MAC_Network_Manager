'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Devices', ['userId'], { name: 'idx_userId' });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Devices', 'idx_userId');
  }
};