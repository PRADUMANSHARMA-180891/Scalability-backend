'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('SevenStarta', 'CkEditorWords', {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn('SevenStarta', 'CkEditorBrand', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('SevenStartas', 'CkEditorWords');
    await queryInterface.removeColumn('SevenStartas', 'CkEditorBrand');
  }
};
