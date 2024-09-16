const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');
const User = require('../UserModels');

const Survey = sequelize.define('Survey', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  surveyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sendToAll: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  anonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  scheduledDelivery: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  sendSurveyOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  closeSurveyAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  emailReminder1: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  emailReminder2: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  emailReminder3: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  emailSubject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    defaultValue: 'open',
},
  createdByUserId: {  // Add the foreign key here
    type: DataTypes.INTEGER,
    references: {
      model: 'users',  // Reference the 'users' table
      key: 'id',       // Reference the primary key in the User model
    },
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
}, {
  timestamps: true,
});

// Associations
Survey.belongsTo(User, { foreignKey: 'createdByUserId' });
User.hasMany(Survey, { foreignKey: 'createdByUserId' });

module.exports = Survey;
