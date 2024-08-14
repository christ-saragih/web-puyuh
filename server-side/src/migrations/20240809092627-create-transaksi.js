"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Transaksis", {
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
            investasiId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Investasis",
                    key: "id",
                },
            },
            tanggal_transaksi: {
                type: Sequelize.DATE,
            },
            total_investasi: {
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.ENUM("segera", "proses", "selesai"),
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
        await queryInterface.dropTable("Transaksis");
    },
};
