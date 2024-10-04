'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ThreeToFive2s', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies', // Make sure the table name is correct, usually the pluralized form
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sub_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Category: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      Projected: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      Actuals: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      OwnerName: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ThreeToFive2s');
  },
};
