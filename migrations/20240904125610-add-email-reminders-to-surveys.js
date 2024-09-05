'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Surveys', 'emailReminder1', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Surveys', 'emailReminder2', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Surveys', 'emailReminder3', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Surveys', 'emailReminder1');
    await queryInterface.removeColumn('Surveys', 'emailReminder2');
    await queryInterface.removeColumn('Surveys', 'emailReminder3');
  }
};
