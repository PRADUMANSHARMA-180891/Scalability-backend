'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_photo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      p_isd: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      whatsapp_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      w_isd: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_login: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      departments_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      remember_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_roles: {
        type: Sequelize.ENUM,
        values: ['administration', 'growth champion', 'decision maker'],
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      twitter_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedin_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      hire_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      hobbies: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      D: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      I: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      S: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      C: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      D2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      I2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      S2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      C2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assignTaskAlert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      taskDueTodayAlert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      changeDueDateAlert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      completeTaskAlert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      stuckAlert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      unstuckAlert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      weeklyAlert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
