'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Supports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies', // Make sure this matches your actual table name in the database
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sub_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      support_title1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      support1: {
        type: Sequelize.JSON,
        allowNull: false
      },
      support_title2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      support2: {
        type: Sequelize.JSON,
        allowNull: false
      },
      support_title3: {
        type: Sequelize.STRING,
        allowNull: false
      },
      support3: {
        type: Sequelize.JSON,
        allowNull: false
      },
      support4: {
        type: Sequelize.JSON,
        allowNull: false
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
    await queryInterface.dropTable('Supports');
  }
};
