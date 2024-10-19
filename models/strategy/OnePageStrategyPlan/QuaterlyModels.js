const sequelize = require('../../../Config/DBs');
const Company = require('../../CompanyModels');
const { DataTypes } = require('sequelize');

const Quaterly  = sequelize.define('Quaterly', {

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
     Category:{
        type: DataTypes.JSON,
        allowNull: false
        
     },
     Projected:{
        type: DataTypes.JSON,
        allowNull: false
        
     },
     Actuals:{
        type: DataTypes.JSON,
        allowNull: false
    },
    OwnerName:{
        type: DataTypes.JSON,
        allowNull: false
    }
    // Define additional fields as needed

});

// Associations
Company.hasMany(Quaterly, { foreignKey: 'companyId' });
Quaterly.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Quaterly;