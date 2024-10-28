const sequelize = require('../../../Config/DBs');
const DataTypes = require('sequelize');
const Company = require('../../CompanyModels');

const TenYearsAspiration = sequelize.define('TenYearsAspiration',
    {
        companyId: {
            type: DataTypes.INTEGER,
            references: {
                model: Company,
                key: 'id'
            },
            allowNull: false
        },
        relationships: {
            type: DataTypes.TEXT, // Use TEXT to accommodate CKEditor content
            allowNull: true,
        },
        achievements: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rituals: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        wealth: {
            type: DataTypes.FLOAT, // Assuming wealth is a numeric value
            allowNull: true,
        },
});

// Associations
Company.hasMany(TenYearsAspiration, { foreignKey: 'companyId'  });
TenYearsAspiration.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = TenYearsAspiration;