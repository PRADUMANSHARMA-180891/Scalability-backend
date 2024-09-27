const sequelize = require('../../Config/DBs');
const { DataTypes } = require('sequelize');
const Company = require('../CompanyModels');


const FourDVision  = sequelize.define('FourDVision', {
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id'
        },
        allowNull: false
    },

    Kpi: {
        type: DataTypes.JSON,
        allowNull: false
    },
    CriticalNumber1:{
        type: DataTypes.JSON,
        allowNull: false
    },

    CriticalNumber2: {
        type: DataTypes.JSON,
        allowNull: false
    }

});

// Associations
Company.hasMany(FourDVision, { foreignKey: 'companyId'  });
FourDVision.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = FourDVision;