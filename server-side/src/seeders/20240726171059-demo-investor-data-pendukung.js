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
        const investorDataPendukung = investors[0].map((investor) => ({
            investorId: investor.id,
            latar_pendidikan: faker.lorem.word(),
            sumber_penghasilan: faker.lorem.word(),
            jumlah_penghasilan: faker.number.int(),
            bidang_usaha: faker.lorem.word(),
            tujuan_investasi: faker.lorem.sentence(),
            no_sid: faker.number.int(),
            tanggal_pembuatan_sid: faker.date.past(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert(
            "InvestorDataPendukung",
            investorDataPendukung,
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
        await queryInterface.bulkDelete("InvestorDataPendukung", null, {});
    },
};
