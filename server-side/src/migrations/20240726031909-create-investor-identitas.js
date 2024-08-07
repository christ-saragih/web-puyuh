"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("InvestorIdentitas", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            investorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Investors",
                    key: "id",
                },
            },
            no_ktp: {
                type: Sequelize.STRING,
            },
            foto_ktp: {
                type: Sequelize.STRING,
            },
            no_npwp: {
                type: Sequelize.STRING,
            },
            foto_npwp: {
                type: Sequelize.STRING,
            },
            selfie_ktp: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("InvestorIdentitas");
    },
};
