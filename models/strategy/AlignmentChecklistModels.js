const { DataTypes } = require("sequelize");
const sequelize = require('../../Config/DBs');
const Section = require("./AlignmentSectionModels");
// const Section = require("./Section"); // Import the Section model

const AlignmentChecklist = sequelize.define("AlignmentChecklist", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sectionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Section,
      key: 'id'
    },
    allowNull: false // A task must belong to a section
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false, // The task description is required
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // By default, a task is not completed
  },
}, {
  timestamps: true,
});

// Associations
Section.hasMany(AlignmentChecklist, { foreignKey: 'sectionId' });
AlignmentChecklist.belongsTo(Section, { foreignKey: 'sectionId' });

module.exports = AlignmentChecklist;
