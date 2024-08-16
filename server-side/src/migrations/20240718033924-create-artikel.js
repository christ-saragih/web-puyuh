"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Artikels", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            penulis: {
                type: Sequelize.STRING,
            },
            jumlah_penglihat: {
                type: Sequelize.INTEGER,
            },
            slug: {
                type: Sequelize.STRING,
            },
            judul: {
                type: Sequelize.STRING,
            },
            gambar: {
                type: Sequelize.STRING,
            },
            deskripsi: {
                type: Sequelize.TEXT,
            },
            tanggal: {
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
        await queryInterface.dropTable("Artikels");
    },
};
