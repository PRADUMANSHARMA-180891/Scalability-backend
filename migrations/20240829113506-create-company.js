'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company_size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      business_habit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: 'India'
      },
      business_type: {
        type: Sequelize.JSON,
        allowNull: true
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      year_established: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      reason_for_using_align: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferred_management_framework: {
        type: Sequelize.STRING,
        allowNull: true
      },
      number_of_employees: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      leadership_team_size: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      profile_picture: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies');
  }
};
