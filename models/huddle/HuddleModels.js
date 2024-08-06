const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');

const Huddle = sequelize.define('Huddle', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoConferenceLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  timeZone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  daysOfWeek: {
    type: DataTypes.JSON,
    allowNull: false,
  },
//   canMeetOnWeekends: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//   },
  weekendDays: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  huddleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Huddle;
