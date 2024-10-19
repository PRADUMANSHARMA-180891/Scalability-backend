const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Company = require('../CompanyModels');


const PowerOfOne  = sequelize.define('PowerOfOne', {
    
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },

    CurrentPosition: {
        type: DataTypes.JSON,
        allowNull: false
    },
    PriceIncrease: {
        type: DataTypes.JSON,
        allowNull: false
    },
    VolumeIncrease: {
        type: DataTypes.JSON,
        allowNull: false
    },
    COGSReduction : {
        type: DataTypes.JSON,
        allowNull: false
    },
    OverheadsReduction  : {
        type: DataTypes.JSON,
        allowNull: false
    },
    ReductioninDebtorsDays  : {
        type: DataTypes.JSON,
        allowNull: false
    },
    ReductioninStockDays  : {
        type: DataTypes.JSON,
        allowNull: false
    },
    IncreaseinCreditorsDays  : {
        type: DataTypes.JSON,
        allowNull: false
    },
    PowerofOneImpact  : {
        type: DataTypes.JSON,
        allowNull: false
    },
    AdjustedPosition  : {
        type: DataTypes.JSON,
        allowNull: false
    },
    // Define additional fields as needed

});

// Associations
Company.hasMany(PowerOfOne, { foreignKey: 'companyId'  });
PowerOfOne.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = PowerOfOne;