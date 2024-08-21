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
                        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7116708630556!2d106.76757977430363!3d-6.558035064107707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5dce5b6ebd3%3A0x7ba6ffb5d199befe!2sSekolah%20Tinggi%20Pariwisata%20Bogor!5e0!3m2!1sid!2sid!4v1724215276273!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
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
