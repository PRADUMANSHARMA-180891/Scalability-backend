const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');
const User = require('../UserModels');

const Enps = sequelize.define('Enps', {
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

  scheduledDelivery: {
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
recipientsCount:{
     type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
},
respondedCount:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
Enps.belongsTo(User, { foreignKey: 'createdByUserId' });
User.hasMany(Enps, { foreignKey: 'createdByUserId' });

module.exports = Enps;
