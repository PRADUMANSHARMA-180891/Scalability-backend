const sequelize = require('../../Config/DBs');
const Datatypes = require('sequelize');

const Suggestion = sequelize.define('Suggestion',{
    suggestionText: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      anonymous: {
        type: Datatypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: Datatypes.INTEGER,
        allowNull: true, // If anonymous, userId can be null
      },
});


module.exports = Suggestion