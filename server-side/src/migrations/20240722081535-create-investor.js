"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Investors", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            kategori_investor: {
                type: Sequelize.ENUM("individu", "organisasi"),
            },
            refresh_token: {
                type: Sequelize.TEXT,
            },
            verificationToken: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            verificationTokenExpiry: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            isVerified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            isVerifiedProfile: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            resetPasswordToken: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            resetPasswordTokenExpiry: {
                type: Sequelize.DATE,
                allowNull: true,
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
        await queryInterface.dropTable("Investors");
    },
};
