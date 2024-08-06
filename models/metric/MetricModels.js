const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');

const Metric = sequelize.define('Metric', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uniqueIdentifier: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active','deprecated', 'inactive', 'draft'),
    allowNull: false,
    defaultValue: 'active',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  valueSource: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cadence: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kpiUnit: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
  
  module.exports = Metric;