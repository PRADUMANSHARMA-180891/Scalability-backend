const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');

const Kpi = sequelize.define('Kpi',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

module.exports =Kpi;