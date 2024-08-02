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
        const admins = await queryInterface.sequelize.query(
            "SELECT id from Admins;"
        );
        const adminBiodata = admins[0].map((admin) => ({
            adminId: admin.id,
            foto_profil: faker.image.avatar(),
            nama_lengkap: faker.person.fullName(),
            jk: faker.helpers.arrayElement(["pria", "wanita"]),
            tempat_lahir: faker.location.city(),
            tanggal_lahir: faker.date.past(),
            no_hp: faker.phone.number(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert("AdminBiodata", adminBiodata, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("AdminBiodata", null, {});
    },
};
