'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PowerOfOnes', {
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
          model: 'Companies',  // This should match your Company model table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      CurrentPosition: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      PriceIncrease: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      VolumeIncrease: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      COGSReduction: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      OverheadsReduction: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      ReductioninDebtorsDays: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      ReductioninStockDays: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      IncreaseinCreditorsDays: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      PowerofOneImpact: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      AdjustedPosition: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PowerOfOnes');
  },
};
