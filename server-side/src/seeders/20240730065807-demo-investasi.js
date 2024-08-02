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

        const judul = faker.lorem.sentence(5);

        const investasi = admins[0].map((admin) => ({
            adminId: admin.id,
            judul: judul,
            gambar: faker.image.url(),
            slug: faker.helpers.slugify(judul).toLowerCase(),
            penerbit: faker.person.fullName(),
            penggunaan_dana: faker.lorem.paragraph(),
            jaminan_kebendaan: faker.lorem.word(),
            bagi_hasil: faker.lorem.word(),
            minimum_investasi: faker.number.float(),
            maksimum_investasi: faker.number.float(),
            satuan_perdagangan: faker.lorem.word(),
            minimum_pendanaan: faker.number.float(),
            maksimum_pendanaan: faker.number.float(),
            tenor: faker.lorem.word(),
            pembayaran_bagi_hasil: faker.lorem.word(),
            tanggal_pembukaan_penawaran: faker.date.past(),
            tanggal_berakhir_penawaran: faker.date.past(),
            status: faker.helpers.arrayElement(["segera", "proses", "selesai"]),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert("Investasis", investasi, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Investasis", null, {});
    },
};
