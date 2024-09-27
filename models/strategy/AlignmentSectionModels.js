const { DataTypes } = require("sequelize");
const sequelize = require('../../Config/DBs');
const Company = require("../CompanyModels");

const Section = sequelize.define("Section", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Company,
      key: 'id'
    },
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, // The title of the section
  }
}, {
  timestamps: true,
});

// Associations
Company.hasMany(Section, { foreignKey: 'companyId' });
Section.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Section;
