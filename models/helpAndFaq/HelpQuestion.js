const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const HelpCategory = require('./HelpCategoryModels');

const Question = sequelize.define('Question', {
  question: {
    type: DataTypes.STRING,
    allowNull: true
  },
  helpCategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: HelpCategory,
      key: 'id'
    }
  }
});

HelpCategory.hasMany(Question, { foreignKey: 'helpCategoryId' });
Question.belongsTo(HelpCategory, { foreignKey: 'helpCategoryId' });

module.exports = Question;

