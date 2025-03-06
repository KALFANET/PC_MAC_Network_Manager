module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Devices', 'osVersion', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Devices', 'cpu', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Devices', 'memory', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Devices', 'platform', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Devices', 'osVersion');
    await queryInterface.removeColumn('Devices', 'cpu');
    await queryInterface.removeColumn('Devices', 'memory');
    await queryInterface.removeColumn('Devices', 'platform');
  }
};