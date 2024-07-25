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
        await queryInterface.bulkInsert(
            "KontakFrontpages",
            [
                {
                    url_map:
                        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.4160554831756!2d106.7878496743095!3d-6.960148868143952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e683a7466b95bfd%3A0xfa59aaabf74caf24!2sP4S!5e0!3m2!1sid!2sid!4v1721894635275!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                    alamat: "2QQR+W5M, Cikembar, Sukabumi Regency, West Java 43157",
                    email: faker.internet.email({
                        firstName: "cvslamet",
                        lastName: "quailfarm",
                        provider: "quailfarm.dev",
                    }),
                    no_phone: faker.phone.number(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
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
        await queryInterface.bulkDelete("KontakFrontpages", null, {});
    },
};
