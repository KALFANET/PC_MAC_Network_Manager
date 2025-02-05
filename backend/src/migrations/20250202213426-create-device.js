'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Devices', { // ודא שזה תואם לשם בטבלה
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIP: true
        }
      },
      status: {
        type: Sequelize.ENUM('online', 'offline', 'unknown'),
        defaultValue: 'unknown'
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // ודא שזה תואם בדיוק לשם בטבלה
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Devices'); // ודא שזה מתאים לשם בטבלה
  }
};