const sequelize = require('../../../Config/DBs');
const Company = require('../../CompanyModels');
const { DataTypes } = require('sequelize');


const Foundation  = sequelize.define('Foundation', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },

    foundation1: {
        type: DataTypes.JSON,
        allowNull: false
    },
    foundation2:{
        type: DataTypes.JSON,
        allowNull: false
    },

    foundation3: {
        type: DataTypes.JSON,
        allowNull: false
    },
    foundation4:{
        type: DataTypes.JSON,
        allowNull: false
    },
    // Define additional fields as needed

});

// Associations
Company.hasMany(Foundation, { foreignKey: 'companyId' });
Foundation.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Foundation;