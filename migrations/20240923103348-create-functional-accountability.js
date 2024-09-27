'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FunctionalAccountabilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',  // Make sure this matches your Company table name
          key: 'id'
        },
        onDelete: 'CASCADE'  // Add onDelete to handle cascade delete
      },
      FunctionsName: {
        type: Sequelize.JSON,
        allowNull: false
      },
      personAccountable: {
        type: Sequelize.JSON,
        allowNull: false
      },
      LeadingIndicators: {
        type: Sequelize.JSON,
        allowNull: false
      },
      Results: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FunctionalAccountabilities');
  }
};
