const sequelize = require('../../../Config/DBs');
const Company = require('../../CompanyModels');
const { DataTypes } = require('sequelize');


const ThreeToFive1  = sequelize.define('ThreeToFive1', {
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
    title1:{
        type: DataTypes.JSON,
        allowNull: false
        
     },

    title2:{
        type: DataTypes.STRING,
        allowNull: false
        
     },
    title3:{
        type: DataTypes.JSON,
        allowNull: false
    }
    // Define additional fields as needed

});

// Associations
Company.hasMany(ThreeToFive1, { foreignKey: 'companyId' });
ThreeToFive1.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = ThreeToFive1;