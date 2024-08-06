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
                type: Sequelize.STRING,
            },
            verificationToken: {
                type: Sequelize.STRING,
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
            resetPasswordToken: {
                type: Sequelize.STRING,
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
