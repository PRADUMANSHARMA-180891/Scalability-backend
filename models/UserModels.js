const sequelize = require('../Config/DBs');
const Datatypes = require('sequelize');

const User = sequelize.define('user',{
    email: {type:Datatypes.STRING, allowNull: false },
    password: {type: Datatypes.STRING, allowNull: false}
});

module.exports = User;