const sequelize = require('../../Config/DBs');
const Datatypes = require('sequelize');

const Task = sequelize.define('Task', {
  shortTaskName: {
    type: Datatypes.STRING,
    allowNull: true,
  },
  dueDate: {
    type: Datatypes.DATEONLY,
    allowNull: true,
  },
  recurring: {
    type: Datatypes.BOOLEAN,
    defaultValue: true,
  },
  assignedTo: {
    type: Datatypes.JSON, // Use JSON type for storing array of user IDs
    allowNull: true,
  },
  priorityName: {
    type: Datatypes.STRING,
    allowNull: true,
  },
  huddleName: {
    type: Datatypes.STRING,
    allowNull: true,
  },
  visibility: {
    type: Datatypes.STRING,
    allowNull: true,
    defaultValue: 'Everyone', // default value
  },
  notes: {
    type: Datatypes.TEXT,
    allowNull: true,
  },
});

module.exports = Task;
