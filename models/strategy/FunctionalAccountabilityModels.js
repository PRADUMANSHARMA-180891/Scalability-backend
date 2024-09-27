const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Company = require('../CompanyModels');

const FunctionalAccountability = sequelize.define('FunctionalAccountability', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },
    FunctionsName: {
        type: DataTypes.JSON,
        allowNull: false
    },
    personAccountable: {
        type: DataTypes.JSON,
        allowNull: false
    },
    LeadingIndicators: {
        type: DataTypes.JSON,
        allowNull: false
    },
    Results: {
        type: DataTypes.JSON,
        allowNull: false
    }
    // Define additional fields as needed

});

// Associations
Company.hasMany(FunctionalAccountability, { foreignKey: 'companyId'  });
FunctionalAccountability.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = FunctionalAccountability;
