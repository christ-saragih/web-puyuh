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
            foto_profil: {
                type: Sequelize.STRING,
            },
            nama_lengkap: {
                type: Sequelize.STRING,
            },
            jk: {
                type: Sequelize.ENUM("pria", "wanita"),
            },
            tempat_lahir: {
                type: Sequelize.STRING,
            },
            tanggal_lahir: {
                type: Sequelize.DATEONLY,
            },
            no_hp: {
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
        await queryInterface.dropTable("InvestorBiodata");
    },
};
