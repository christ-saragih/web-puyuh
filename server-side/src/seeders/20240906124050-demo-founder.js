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

        const founder = [];

        for (let i = 0; i < 3; i++) {
            const data = {
                nama: faker.lorem.word(),
                jabatan: faker.lorem.word(),
                deskripsi: faker.lorem.paragraphs(),
                gambar: faker.image.url(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            founder.push(data);
        }

        await queryInterface.bulkInsert("founders", founder, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("founders", null, {});
    },
};
