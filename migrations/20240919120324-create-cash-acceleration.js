'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CashAccelerations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies', // Make sure the table name is correct in your DB
          key: 'id'
        },
        onDelete: 'CASCADE', // Optional, defines behavior on deletion
        onUpdate: 'CASCADE'  // Optional, defines behavior on update
      },
      SalesCycle: {
        type: Sequelize.JSON,
        allowNull: false
      },
      ProductionInventoryCycle: {
        type: Sequelize.JSON,
        allowNull: false
      },
      DeliveryCycle: {
        type: Sequelize.JSON,
        allowNull: false
      },
      BillingPaymentCycle: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CashAccelerations');
  }
};
