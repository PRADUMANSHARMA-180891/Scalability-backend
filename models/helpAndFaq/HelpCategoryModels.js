const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');

const HelpCategory = sequelize.define('HelpCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = HelpCategory;