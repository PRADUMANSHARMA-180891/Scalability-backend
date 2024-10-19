const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Company = require('../CompanyModels');


const CashAcceleration  = sequelize.define('CashAcceleration', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },
    SalesCycle: {
        type: DataTypes.JSON,
        allowNull: false
    },
    ProductionInventoryCycle: {
        type: DataTypes.JSON,
        allowNull: false
    },
    DeliveryCycle: {
        type: DataTypes.JSON,
        allowNull: false
    },
    BillingPaymentCycle: {
        type: DataTypes.JSON,
        allowNull: false
    }
    // Define additional fields as needed

});

// Associations
Company.hasMany(CashAcceleration, { foreignKey: 'companyId'  });
CashAcceleration.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = CashAcceleration;