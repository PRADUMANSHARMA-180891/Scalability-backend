const sequelize = require('../../../Config/DBs');
const DataTypes = require('sequelize');
const Company = require('../../CompanyModels');

const OneYearActive = sequelize.define('OneYearActive',
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
Company.hasMany(OneYearActive, { foreignKey: 'companyId'  });
OneYearActive.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = OneYearActive;