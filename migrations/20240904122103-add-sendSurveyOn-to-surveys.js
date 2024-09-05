'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Surveys', 'sendSurveyOn', {
      type: Sequelize.DATE,
      allowNull: true, // Set to true if the field is optional
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Surveys', 'sendSurveyOn');
  }
};
