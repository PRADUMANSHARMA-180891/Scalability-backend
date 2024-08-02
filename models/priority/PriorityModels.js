const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Period = require('../period/CreatePeriod');

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
  PeriodId: {  // This should be PeriodId, not PriorityId
    type: DataTypes.INTEGER,
    references: {
      model: Period,
      key: 'id'
    }
  }
});

// Associations
Period.hasMany(Priority, { foreignKey: 'PeriodId', as: 'Priorities' });
Priority.belongsTo(Period, { foreignKey: 'PeriodId', as: 'Period' });

module.exports = Priority;
