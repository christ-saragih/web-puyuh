"use strict";

const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
const { Investasi, Transaksi } = require("../models"); // Import model Investasi dan Transaksi

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const investors = await queryInterface.sequelize.query(
            "SELECT id FROM Investors;"
        );

        const investasis = await queryInterface.sequelize.query(
            "SELECT id FROM Investasis;"
        );

        const transaksi = [];
        for (let i = 0; i < 3; i++) {
            const status = faker.helpers.arrayElement([
                "segera",
                "proses",
                "selesai",
            ]);

            const data = {
                investorId: faker.helpers.arrayElement(investors[0]).id,
                investasiId: faker.helpers.arrayElement(investasis[0]).id,
                tanggal_transaksi: faker.date.past(),
                total_investasi: faker.number.bigInt(),
                status: status,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            transaksi.push(data);
        }

        await queryInterface.bulkInsert("Transaksis", transaksi, {});

        // Loop melalui setiap investasi untuk menghitung total pendanaan dari transaksi yang selesai
        for (const investasi of investasis[0]) {
            // Hitung total pendanaan dari transaksi dengan status "selesai"
            const totalPendanaan = await queryInterface.sequelize.query(
                `SELECT SUM(total_investasi) AS totalPendanaan
                 FROM Transaksis
                 WHERE investasiId = ${investasi.id}
                 AND status = 'selesai';`
            );

            // Update kolom total_pendanaan di tabel Investasis
            await queryInterface.sequelize.query(
                `UPDATE Investasis
                 SET total_pendanaan = ${
                     totalPendanaan[0][0].totalPendanaan || 0
                 }
                 WHERE id = ${investasi.id};`
            );
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Transaksis", null, {});
    },
};
