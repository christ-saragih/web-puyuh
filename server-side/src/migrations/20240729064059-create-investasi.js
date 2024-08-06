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
            gambar: {
                type: Sequelize.STRING,
            },
            slug: {
                type: Sequelize.STRING,
            },
            penerbit: {
                type: Sequelize.STRING,
            },
            penggunaan_dana: {
                type: Sequelize.STRING,
            },
            bagi_hasil: {
                type: Sequelize.STRING,
            },
            minimum_investasi: {
                type: Sequelize.BIGINT,
            },
            maksimum_investasi: {
                type: Sequelize.BIGINT,
            },
            total_pendanaan: {
                type: Sequelize.BIGINT,
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
