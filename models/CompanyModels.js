const sequelize = require('../Config/DBs');
const Datatypes = require('sequelize');

const Company = sequelize.define('company',{
    company_name:{
        type: Datatypes.STRING,
        allowNull: false
    },
    company_size:{
        type: Datatypes.INTEGER,
        allowNull: false
    },
    first_name:{
        type: Datatypes.STRING,
        allowNull:false
    },
    last_name: {
       type: Datatypes.STRING,
       allowNull:false
    },
    email:{
        type : Datatypes.STRING,
        allowNull : false
    },
    phone:{
        type: Datatypes.BIGINT,
        allowNull:false
    },
    role:{
        type: Datatypes.STRING,
        allowNull: false
    },
    business_habit:{
        type : Datatypes.STRING,
        allowNull:false
    }
});


module.exports = Company;