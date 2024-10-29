'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NintyDaysActions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies', // Ensure this matches the name of your Company table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      relationships: {
        type: Sequelize.TEXT, // For CKEditor content
        allowNull: true,
      },
      achievements: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rituals: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      wealth: {
        type: Sequelize.FLOAT, // Assuming wealth is a numeric value
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NintyDaysActions');
  },
};
