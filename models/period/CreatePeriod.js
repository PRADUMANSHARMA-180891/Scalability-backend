// models/Period.js

const sequelize = require('../../Config/DBs');
const DataTypes  = require('sequelize');

const Period = sequelize.define('Period', {
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
});

module.exports = Period;
