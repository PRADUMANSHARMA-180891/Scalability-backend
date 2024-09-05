const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Survey = require('./SurveyModels');

const SurveyQuestion = sequelize.define('SurveyQuestion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('text', 'multiple-choice', 'rating'),
    allowNull: false,
  },
  required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  surveyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Survey,
      key: 'id',
    },
    onDelete: 'CASCADE', // Optional: this ensures that deleting a survey also deletes its associated questions
  },
}, {
  timestamps: true,
});

// Associations
Survey.hasMany(SurveyQuestion, { foreignKey: 'surveyId' });
SurveyQuestion.belongsTo(Survey, { foreignKey: 'surveyId' });

module.exports = SurveyQuestion;
