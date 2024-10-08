'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quaterlies', {
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
          model: 'Companies', // The name of the related table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sub_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Category: {
        type: Sequelize.JSON,
        allowNull: false
      },
      Projected: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Actuals: {
        type: Sequelize.JSON,
        allowNull: false
      },
      OwnerName: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Quaterlies');
  }
};
