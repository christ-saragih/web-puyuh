"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("InvestorAlamat", {
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
            alamat: {
                type: Sequelize.TEXT,
            },
            provinsi: {
                type: Sequelize.STRING,
            },
            kota: {
                type: Sequelize.STRING,
            },
            kecamatan: {
                type: Sequelize.STRING,
            },
            kelurahan: {
                type: Sequelize.STRING,
            },
            kode_pos: {
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
        await queryInterface.dropTable("InvestorAlamat");
    },
};
