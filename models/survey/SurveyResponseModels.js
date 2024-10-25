const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');
const User = require('../UserModels');
const Survey = require('./SurveyModels');

const MySurveyResponse = sequelize.define('MySurveyResponse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  surveyId: {
    type: DataTypes.INTEGER,
    references: {
      model: "survey",
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
MySurveyResponse.belongsTo(Survey, { foreignKey: 'surveyId' });
Survey.hasMany(MySurveyResponse, { foreignKey: 'surveyId' });

MySurveyResponse.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(MySurveyResponse, { foreignKey: 'userId' });

module.exports = MySurveyResponse;
