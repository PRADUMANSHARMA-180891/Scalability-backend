const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      }
});


module.exports = Tag;