"use strict";
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const artikels = [];
        const artikelTags = [];
        // const imageDirectory = path.join(
        //     __dirname,
        //     "..",
        //     "..",
        //     "public",
        //     "images",
        //     "artikels"
        // );

        // if (!fs.existsSync(imageDirectory)) {
        //     fs.mkdirSync(imageDirectory, { recursive: true });
        // }

        // Fetch all tags
        const tags = await queryInterface.sequelize.query(
            `SELECT id FROM Tags;`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        for (let i = 0; i < 10; i++) {
            const judul = faker.lorem.sentence();
            // const imageFileName = `${faker.string.uuid()}.jpg`;
            // const imagePath = path.join(imageDirectory, imageFileName);

            // // Generate an image and save it to the specified directory
            // fs.writeFileSync(imagePath, faker.image.url(640, 480));

            const artikel = {
                penulis: faker.person.fullName(),
                jumlah_penglihat: faker.number.int({ min: 1, max: 100 }),
                judul: judul,
                slug: faker.helpers.slugify(judul).toLowerCase(),
                // gambar: `${imageFileName}`,
                gambar: faker.image.url(),
                deskripsi: faker.lorem.paragraphs(),
                tanggal: faker.date.past(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Add the article to the list
            artikels.push(artikel);

            // Select a random number of tags for the article (e.g., 1 to 3 tags)
            const numTags = faker.number.int({ min: 1, max: 3 });
            const selectedTags = faker.helpers.shuffle(tags).slice(0, numTags);

            // Create entries for ArtikelTag
            selectedTags.forEach((tag) => {
                artikelTags.push({
                    artikelId: i + 1, // Assuming article IDs will be sequential starting from 1
                    tagId: tag.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            });
        }

        await queryInterface.bulkInsert("Artikels", artikels, {});
        await queryInterface.bulkInsert("ArtikelTags", artikelTags, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("ArtikelTags", null, {});
        await queryInterface.bulkDelete("Artikels", null, {});
    },
};
