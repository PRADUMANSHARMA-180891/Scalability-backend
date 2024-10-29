'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('OneYearActives', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            companyId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Companies', // Adjust this if your table name is different
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('OneYearActives');
    }
};
