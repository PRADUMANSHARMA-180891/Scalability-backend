const sequelize = require('../Config/DBs');
const Datatypes = require('sequelize');

const Company = sequelize.define('company', {
    company_name: {
        type: Datatypes.STRING,
        allowNull: false
    },
    company_size: {
        type: Datatypes.INTEGER,
        allowNull: false
    },
    first_name: {
        type: Datatypes.STRING,
        allowNull: false
    },
    last_name: {
        type: Datatypes.STRING,
        allowNull: false
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false
    },
    phone: {
        type: Datatypes.BIGINT,
        allowNull: false
    },
    role: {
        type: Datatypes.STRING,
        allowNull: false
    },
    business_habit: {
        type: Datatypes.STRING,
        allowNull: false
    },
    country: {
        type: Datatypes.JSON,
        allowNull: true,
        defaultValue: 'India'
    },
    business_type: {
        type: Datatypes.JSON,
        allowNull: true
    },
    website: {
        type: Datatypes.STRING,
        allowNull: true
    },
    year_established: {
        type: Datatypes.INTEGER,
        allowNull: true
    },
    reason_for_using_align: {
        type: Datatypes.STRING,
        allowNull: true
    },
    preferred_management_framework: {
        type: Datatypes.STRING,
        allowNull: true
    },
    number_of_employees: {
        type: Datatypes.INTEGER,
        allowNull: true
    },
    leadership_team_size: {
        type: Datatypes.INTEGER,
        allowNull: true
    },
    profile_picture: {
        type: Datatypes.TEXT, // This can be a URL or a file path
        allowNull: true
    }
});

module.exports = Company;
