const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Company = require('../CompanyModels');


const SevenStarta  = sequelize.define('SevenStarta', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },

    WordsYouOwn: {
        type: DataTypes.JSON,
        allowNull: false
    },
    CkEditorWords:{
        type: DataTypes.JSON,
        allowNull: false
    },

    BrandPromises: {
        type: DataTypes.JSON,
        allowNull: false
    },
    CkEditorBrand:{
        type: DataTypes.JSON,
        allowNull: false
    },
    // Define additional fields as needed

});

// Associations
Company.hasMany(SevenStarta, { foreignKey: 'companyId'  });
SevenStarta.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = SevenStarta;