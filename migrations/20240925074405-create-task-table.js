'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlignmentChecklists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false, // The AlignmentChecklist description is required
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // By default, an AlignmentChecklist is not completed
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies', // The table name for the Company model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AlignmentChecklists');
  }
  
};
