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
            foto_profil: faker.image.avatar(),
            nama_lengkap: faker.person.fullName(),
            jk: faker.helpers.arrayElement(["pria", "wanita"]),
            tempat_lahir: faker.location.city(),
            tanggal_lahir: faker.date.past(),
            no_hp: faker.phone.number(),
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
