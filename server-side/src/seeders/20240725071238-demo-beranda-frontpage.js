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
        const dashboards = [];

        for (let i = 0; i < 1; i++) {
            const dashboard = {
                judul: faker.lorem.sentence(),
                subJudul: faker.lorem.sentence(),
                gambar: faker.image.url(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            dashboards.push(dashboard);
        }

        await queryInterface.bulkInsert("BerandaFrontpages", dashboards, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("BerandaFrontpages", null, {});
    },
};
