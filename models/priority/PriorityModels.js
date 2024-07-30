const sequelize = require('../../Config/DBs');
const DataTypes  = require('sequelize');

const Priority = sequelize.define('Priority', {
  priority_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  target: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  current_value_source: {
    type: DataTypes.ENUM('manual entry', 'connect a metric'),
  },
});

module.exports = Priority;
