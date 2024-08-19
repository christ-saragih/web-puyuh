"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("InvestorDataPendukung", {
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
            latar_pendidikan: {
                type: Sequelize.STRING,
            },
            sumber_penghasilan: {
                type: Sequelize.STRING,
            },
            jumlah_penghasilan: {
                type: Sequelize.STRING,
            },
            bidang_usaha: {
                type: Sequelize.STRING,
            },
            tujuan_investasi: {
                type: Sequelize.STRING,
            },
            no_sid: {
                type: Sequelize.STRING,
            },
            tanggal_pembuatan_sid: {
                type: Sequelize.DATEONLY,
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
        await queryInterface.dropTable("InvestorDataPendukung");
    },
};
