'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Themes', 'title5', {
      type: Sequelize.STRING,
      allowNull: false, // Set to true if you want to allow null values
    });
    
    await queryInterface.addColumn('Themes', 'title6', {
      type: Sequelize.STRING,
      allowNull: false, // Set to true if you want to allow null values
    });
    
    await queryInterface.addColumn('Themes', 'title7', {
      type: Sequelize.STRING,
      allowNull: false, // Set to true if you want to allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Themes', 'title5');
    await queryInterface.removeColumn('Themes', 'title6');
    await queryInterface.removeColumn('Themes', 'title7');
  }
};
