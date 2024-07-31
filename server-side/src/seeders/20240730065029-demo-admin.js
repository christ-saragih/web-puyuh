"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const admins = [];
        const password = await bcrypt.hash("password", 10);

        for (let i = 0; i < 3; i++) {
            const data = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: password,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            admins.push(data);
        }

        await queryInterface.bulkInsert("Admins", admins, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Admins", null, {});
    },
};
