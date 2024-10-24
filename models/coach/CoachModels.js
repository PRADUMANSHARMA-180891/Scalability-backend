// const sequelize = require('../../Config/DBs');
const sequelize = require('../../Config/DBs');
const DataTypes = require('sequelize');

const CoachInvite = sequelize.define('CoachInvite', {
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
  
  module.exports = CoachInvite;