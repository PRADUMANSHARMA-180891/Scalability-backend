
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the Foundation table
    await queryInterface.createTable('Foundations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies', // Name of the table you're referencing
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      foundation1: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      foundation2: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      foundation3: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      foundation4: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the Foundation table
    await queryInterface.dropTable('Foundations');
  },
};
