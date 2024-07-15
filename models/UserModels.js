const sequelize = require('../Config/DBs');
const Datatypes = require('sequelize');

const User = sequelize.define('user',{
    name: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    email: {type:Datatypes.STRING, allowNull: false },
    password: {type: Datatypes.STRING, allowNull: false},
    username: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    user_photo: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: Datatypes.INTEGER,
        allowNull: true,
    },
    p_isd: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    whatsapp_no: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    w_isd: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    otp: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    position: {
        type: Datatypes.STRING,
        allowNull: true,
    },
    is_login: {
        type: Datatypes.BOOLEAN,
        defaultValue: 0,
    },
    is_verified: {
        type: Datatypes.BOOLEAN,
        defaultValue: 0,
    },
    company_id: {
        type: Datatypes.INTEGER,
        allowNull: true,
    },
    departments_id: {
        type: Datatypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: Datatypes.BOOLEAN,
        defaultValue: 0,
    },
    remember_token: {
        type: Datatypes.TEXT,
        allowNull: true,
    }
});

module.exports = User;