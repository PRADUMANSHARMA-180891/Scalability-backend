'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SurveyQuestions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('text', 'multiple-choice', 'rating'),
        allowNull: false,
      },
      required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Surveys', // explicitly specify the table name
          },
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: this ensures that deleting a survey also deletes its associated questions
        onUpdate: 'CASCADE', // Optional: updates the foreign key if the referenced key is changed
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SurveyQuestions');
  }
};
