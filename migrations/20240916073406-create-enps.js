'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Enps', {
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
      scheduledDelivery: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      closeSurveyAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      emailReminder1: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      emailReminder2: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      emailReminder3: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      emailSubject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailMessage: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'open',
      },
      createdByUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Ensure 'Users' is the correct table name for your User model
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Enps');
  }
};
