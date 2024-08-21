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
            deskripsi: faker.lorem.paragraph(),
            gambar: faker.image.url(),
            alamat: faker.lorem.paragraph(),
            url_map:
                '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7116708630556!2d106.76757977430363!3d-6.558035064107707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5dce5b6ebd3%3A0x7ba6ffb5d199befe!2sSekolah%20Tinggi%20Pariwisata%20Bogor!5e0!3m2!1sid!2sid!4v1724215276273!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
            slug: faker.helpers.slugify(judul).toLowerCase(),
            penerbit: faker.person.fullName(),
            penggunaan_dana: faker.lorem.paragraph(),
            bagi_hasil: faker.lorem.word(),
            minimum_investasi: faker.number.bigInt(),
            maksimum_investasi: faker.number.bigInt(),
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
