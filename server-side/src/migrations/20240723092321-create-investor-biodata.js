"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("InvestorBiodata", {
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
            nama_lengkap: {
                type: Sequelize.STRING,
            },
            jk: {
                type: Sequelize.ENUM("pria", "wanita"),
            },
            tampat_lahir: {
                type: Sequelize.STRING,
            },
            tanggal_lahir: {
                type: Sequelize.DATE,
            },
            no_hp: {
                type: Sequelize.STRING,
            },
            kategori_investor: {
                type: Sequelize.ENUM("individu", "organisasi"),
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
        await queryInterface.dropTable("InvestorBiodata");
    },
};
