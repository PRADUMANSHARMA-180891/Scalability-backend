const sequelize = require('../../Config/DBs');
const Datatypes = require('sequelize');


const Share = sequelize.define('Share',{
     email: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      message: {
        type: Datatypes.TEXT,
        allowNull: true,
      },
});


module.exports = Share;