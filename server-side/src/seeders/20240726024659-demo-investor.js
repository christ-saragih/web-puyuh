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
        const investors = [];
        const password = await bcrypt.hash("password", 10);

        for (let i = 0; i < 3; i++) {
            const data = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: password,
                kategori_investor: faker.helpers.arrayElement([
                    "individu",
                    "organisasi",
                ]),
                isVerified: faker.datatype.boolean(1),
                isVerifiedProfile: faker.datatype.boolean(0),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            investors.push(data);
        }

        await queryInterface.bulkInsert("Investors", investors, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Investors", null, {});
    },
};
