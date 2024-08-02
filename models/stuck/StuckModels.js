const sequelize = require('../../Config/DBs');
const Datatypes = require('sequelize');


const Stuck = sequelize.define('Stuck',{
    iNeedHelpFrom: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      notes: {
        type: Datatypes.TEXT,
        allowNull: true,
      },
});


module.exports = Stuck;