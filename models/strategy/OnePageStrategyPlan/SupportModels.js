const sequelize = require('../../../Config/DBs');
const Company = require('../../CompanyModels');
const { DataTypes } = require('sequelize');


const Support  = sequelize.define('Support', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },
     title:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
     sub_title:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
     support_title1:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
     support1: {
        type: DataTypes.JSON,
        allowNull: false
    },
    support_title2:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
     support2:{
        type: DataTypes.JSON,
        allowNull: false
    },

    support_title3:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
     support3:{
        type: DataTypes.JSON,
        allowNull: false
    },
    support4:{
        type: DataTypes.JSON,
        allowNull: false
    },
    // Define additional fields as needed

});

// Associations
Company.hasMany(Support, { foreignKey: 'companyId' });
Support.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Support;