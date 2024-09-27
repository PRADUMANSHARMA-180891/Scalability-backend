'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AlignmentChecklists', 'sectionId', {
      type: Sequelize.INTEGER,      
      allowNull: false, // A task must belong to a section
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // This will delete the tasks if the associated section is deleted
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('AlignmentChecklists', 'sectionId');
  },
};
