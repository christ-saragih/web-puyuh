"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("AdminBiodata", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            adminId: {
                type: Sequelize.INTEGER,
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
                type: Sequelize.DATE,
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
        await queryInterface.dropTable("AdminBiodata");
    },
};
