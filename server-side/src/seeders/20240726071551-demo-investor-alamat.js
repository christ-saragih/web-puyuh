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
        const investorAlamat = investors[0].map((investor) => ({
            investorId: investor.id,
            alamat: faker.location.streetAddress({ useFullAddress: true }),
            provinsi: faker.location.country(),
            kota: faker.location.city(),
            kecamatan: faker.location.city(),
            kelurahan: faker.location.city(),
            kode_pos: faker.location.countryCode("numeric"),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert("InvestorAlamat", investorAlamat, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("InvestorAlamat", null, {});
    },
};
