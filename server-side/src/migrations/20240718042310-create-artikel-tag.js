"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ArtikelTags", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            artikelId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Artikels",
                    key: "id",
                },
            },
            tagId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Tags",
                    key: "id",
                },
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("ArtikelTags");
    },
};
