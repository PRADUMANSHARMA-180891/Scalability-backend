'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'companies', // This should match the table name of the Company model
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'companyId');
  }
};
