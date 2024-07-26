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
        const investorBiodata = investors[0].map((investor) => ({
            investorId: investor.id,
            nama_lengkap: faker.name.findName(),
            jk: faker.random.arrayElement(["L", "P"]),
            tempat_lahir: faker.address.city(),
            tanggal_lahir: faker.date.past(30, new Date(2000, 0, 1)),
            no_hp: faker.phone.phoneNumber(),
            kategori_investor: faker.random.arrayElement([
                "individu",
                "organisasi",
            ]),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert("InvestorBiodata", investorBiodata, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("InvestorBiodata", null, {});
    },
};
