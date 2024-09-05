const sequelize = require('../../Config/DBs');
const Datatypes = require('sequelize');

const Response = sequelize.define('Response',{
    responseText: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      suggestionId: {
        type: Datatypes.INTEGER,
        references: {
          model: 'Suggestions', // assumes you have a `Suggestions` model
          key: 'id'
        },
        onDelete: 'CASCADE'
    }
});


module.exports = Response