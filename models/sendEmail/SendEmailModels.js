const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');

const UserInvite = sequelize.define('UserInvite', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'User',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  
  module.exports = UserInvite;