'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Surveys', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      surveyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sendToAll: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      anonymous: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      scheduledDelivery: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      closeSurveyAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      emailReminders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      emailSubject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailMessage: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('Surveys');
  }
};
