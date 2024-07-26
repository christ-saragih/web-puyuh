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

        const dokumen = [];

        for (let i = 0; i < 3; i++) {
            const status = ["aktif", "tidak-aktif"];
            const data = {
                nama: faker.lorem.word(),
                file: faker.image.url(),
                status: status[Math.floor(Math.random() * status.length)],
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            dokumen.push(data);
        }

        await queryInterface.bulkInsert("DokumenFrontpages", dokumen, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("DokumenFrontpages", null, {});
    },
};
