'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProccessAccountabilities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', // Table name in the database
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      processName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      personAccountable: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kpis: {
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProccessAccountabilities');
  }
};
