const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');
const Enps = require('./EnpsModels');
const User = require('../UserModels');
// const Enps = require('./Enps');
// const User = require('../UserModels');

const SurveyResponse = sequelize.define('SurveyResponse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  surveyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Enps,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  responseText: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  timestamps: true,
});

// Associations
SurveyResponse.belongsTo(Enps, { foreignKey: 'surveyId' });
Enps.hasMany(SurveyResponse, { foreignKey: 'surveyId' });

SurveyResponse.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(SurveyResponse, { foreignKey: 'userId' });

module.exports = SurveyResponse;
