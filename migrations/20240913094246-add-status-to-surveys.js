'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Surveys', 'status', {
      type: Sequelize.ENUM('open', 'closed'),
      defaultValue: 'open',
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // To rollback, we need to remove the enum type safely
    await queryInterface.removeColumn('Surveys', 'status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Surveys_status";');
  }
};
