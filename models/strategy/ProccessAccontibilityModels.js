const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Company = require('../CompanyModels');

const ProccessAccountability = sequelize.define('ProccessAccountability', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },
    processName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personAccountable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kpis: {
        type: DataTypes.TEXT
    }
    // Define additional fields as needed

});

// Associations
Company.hasMany(ProccessAccountability, { foreignKey: 'companyId'  });
ProccessAccountability.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = ProccessAccountability;
