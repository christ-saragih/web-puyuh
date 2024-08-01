"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Investasis", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            adminId: {
                type: Sequelize.INTEGER,
            },
            judul: {
                type: Sequelize.STRING,
            },
            penerbit: {
                type: Sequelize.STRING,
            },
            penggunaan_dana: {
                type: Sequelize.STRING,
            },
            jaminan_kebendaan: {
                type: Sequelize.STRING,
            },
            bagi_hasil: {
                type: Sequelize.STRING,
            },
            minimum_investasi: {
                type: Sequelize.FLOAT,
            },
            maksimum_investasi: {
                type: Sequelize.FLOAT,
            },
            satuan_perdagangan: {
                type: Sequelize.STRING,
            },
            minimum_pendanaan: {
                type: Sequelize.FLOAT,
            },
            maksimum_pendanaan: {
                type: Sequelize.FLOAT,
            },
            total_pendanaan: {
                type: Sequelize.FLOAT,
            },
            tenor: {
                type: Sequelize.STRING,
            },
            pembayaran_bagi_hasil: {
                type: Sequelize.STRING,
            },
            tanggal_pembukaan_penawaran: {
                type: Sequelize.DATE,
            },
            tanggal_berakhir_penawaran: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable("Investasis");
    },
};