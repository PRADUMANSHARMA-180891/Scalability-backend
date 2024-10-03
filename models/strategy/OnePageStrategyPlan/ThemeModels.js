const sequelize = require('../../../Config/DBs');
const Company = require('../../CompanyModels');
const { DataTypes } = require('sequelize');


const Theme  = sequelize.define('Theme', {
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
     theme_name:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
     deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    title2:{
        type: DataTypes.STRING,
        allowNull: false
        
     },

    title3:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
    title4:{
        type: DataTypes.JSON,
        allowNull: false
    },
    title5:{
        type: DataTypes.STRING,
        allowNull: false
    },
    title6:{
        type: DataTypes.STRING,
        allowNull: false
    },
    title7:{
        type: DataTypes.STRING,
        allowNull: false
    }
    // Define additional fields as needed

});

// Associations
Company.hasMany(Theme, { foreignKey: 'companyId' });
Theme.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Theme;