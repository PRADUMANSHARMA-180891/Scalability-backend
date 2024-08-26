'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserInvites', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'User',
      },
      token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      accepted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserInvites');
  }
};
