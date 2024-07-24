// models/announcement.js
const sequelize = require('../Config/DBs');
const DataTypes = require('sequelize');
const User = require('./UserModels');

const Announcement = sequelize.define('Announcement', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      emailSubject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: { // Foreign key to reference User
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  
    User.hasMany(Announcement, { foreignKey: 'userId' });
    Announcement.belongsTo(User, { foreignKey: 'userId'  });
    
module.exports = Announcement;
  
  