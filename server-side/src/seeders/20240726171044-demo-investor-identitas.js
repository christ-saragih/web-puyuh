"use strict";

const { faker } = require("@faker-js/faker");

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
        const investors = await queryInterface.sequelize.query(
            "SELECT id from Investors;"
        );
        const investorIdentitas = investors[0].map((investor) => ({
            investorId: investor.id,
            no_ktp: faker.number.int(),
            foto_ktp: faker.image.url(),
            no_npwp: faker.number.int(),
            foto_npwp: faker.image.url(),
            selfie_ktp: faker.image.url(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert(
            "InvestorIdentitas",
            investorIdentitas,
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("InvestorIdentitas", null, {});
    },
};
