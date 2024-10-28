'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TenYearsAspiration', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            relationships: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            achievements: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            rituals: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            wealth: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            companyId: {  // Added companyId field
                type: Sequelize.INTEGER,
                allowNull: false,  // Set to false if this field is required
                references: {
                    model: 'Companies', // Name of the reference table
                    key: 'id', // Key in the reference table
                },
                onUpdate: 'CASCADE',  // Update action on foreign key change
                onDelete: 'CASCADE',  // Delete action on foreign key change
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('TenYearsAspiration');
    }
};
