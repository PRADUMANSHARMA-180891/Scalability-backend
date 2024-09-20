module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Enps', 'recipientsCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.addColumn('Enps', 'respondedCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Enps', 'recipientsCount');
    await queryInterface.removeColumn('Enps', 'respondedCount');
  }
};
