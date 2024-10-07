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
                references: {
                    model: "Admins",
                    key: "id",
                },
            },
            judul: {
                type: Sequelize.STRING,
            },
            deskripsi: {
                type: Sequelize.TEXT,
            },
            gambar: {
                type: Sequelize.STRING,
            },
            alamat: {
                type: Sequelize.TEXT,
            },
            url_map: {
                type: Sequelize.TEXT,
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
                type: Sequelize.FLOAT,
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
            target_pendanaan: {
                type: Sequelize.BIGINT,
            },
            tenor: {
                type: Sequelize.STRING,
            },
            pembayaran_bagi_hasil: {
                type: Sequelize.STRING,
            },
            tanggal_pembukaan_penawaran: {
                type: Sequelize.DATEONLY,
            },
            tanggal_berakhir_penawaran: {
                type: Sequelize.DATEONLY,
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
