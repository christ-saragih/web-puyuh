const { Investasi, Notifikasi } = require("../models");

const { exit } = require("process");
const { sendNotification } = require("../services/notifikasiService");

const sendNotificationIfNotExists = async (judul, tanggal, notifikasis) => {
    // Cek apakah notifikasi dengan judul yang sama sudah ada
    const exists = notifikasis.some((notifikasi) => notifikasi.judul === judul);

    if (!exists) {
        await sendNotification(judul, tanggal);
    }
};

// Fungsi untuk menghitung H-7, H-3, dan H-1 dari suatu tanggal
const calculateDaysBefore = (date, daysBefore) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - daysBefore);
    return newDate.toISOString().split("T")[0]; // Format ke YYYY-MM-DD
};

exports.sendNotificationInvestasi = async (req, res) => {
    try {
        const investasis = await Investasi.findAll();
        const notifikasis = await Notifikasi.findAll();

        const today = new Date().toISOString().split("T")[0];

        for (let i = 0; i < investasis.length; i++) {
            const investasi = investasis[i];

            // Cek untuk tanggal pembukaan penawaran
            const tanggalPembukaan = investasi.tanggal_pembukaan_penawaran;

            if (tanggalPembukaan) {
                const judulPembukaan = `Investasi ${investasi.judul}`;
                const h7Pembukaan = calculateDaysBefore(tanggalPembukaan, 7);
                const h3Pembukaan = calculateDaysBefore(tanggalPembukaan, 3);
                const h1Pembukaan = calculateDaysBefore(tanggalPembukaan, 1);

                if (today === tanggalPembukaan) {
                    await sendNotificationIfNotExists(
                        `TELAH DIBUKA: ${judulPembukaan}`,
                        tanggalPembukaan,
                        notifikasis
                    );
                    console.log(judulPembukaan);
                }

                if (today === h7Pembukaan) {
                    await sendNotificationIfNotExists(
                        `H-7: ${judulPembukaan} Segera dibuka!`,
                        tanggalPembukaan,
                        notifikasis
                    );
                    console.log(`H-7: ${judulPembukaan}`);
                }

                if (today === h3Pembukaan) {
                    await sendNotificationIfNotExists(
                        `H-3: ${judulPembukaan} Segera dibuka!`,
                        tanggalPembukaan,
                        notifikasis
                    );
                    console.log(`H-3: ${judulPembukaan}`);
                }

                if (today === h1Pembukaan) {
                    await sendNotificationIfNotExists(
                        `H-1: ${judulPembukaan} Segera dibuka!`,
                        tanggalPembukaan,
                        notifikasis
                    );
                    console.log(`H-1: ${judulPembukaan}`);
                }
            }

            // Cek untuk tanggal berakhir penawaran
            const tanggalBerakhir = investasi.tanggal_berakhir_penawaran;

            if (tanggalBerakhir) {
                const judulBerakhir = `Investasi ${investasi.judul}`;
                const h7Berakhir = calculateDaysBefore(tanggalBerakhir, 7);
                const h3Berakhir = calculateDaysBefore(tanggalBerakhir, 3);
                const h1Berakhir = calculateDaysBefore(tanggalBerakhir, 1);

                if (today === tanggalBerakhir) {
                    await sendNotificationIfNotExists(
                        `TELAH BERAKHIR: ${judulBerakhir}`,
                        tanggalBerakhir,
                        notifikasis
                    );
                    console.log(judulBerakhir);
                }

                if (today === h7Berakhir) {
                    await sendNotificationIfNotExists(
                        `H-7: ${judulBerakhir} segera berakhir!`,
                        tanggalBerakhir,
                        notifikasis
                    );
                    console.log(`H-7: ${judulBerakhir}`);
                }

                if (today === h3Berakhir) {
                    await sendNotificationIfNotExists(
                        `H-3: ${judulBerakhir} segera berakhir!`,
                        tanggalBerakhir,
                        notifikasis
                    );
                    console.log(`H-3: ${judulBerakhir}`);
                }

                if (today === h1Berakhir) {
                    await sendNotificationIfNotExists(
                        `H-1: ${judulBerakhir} segera berakhir!`,
                        tanggalBerakhir,
                        notifikasis
                    );
                    console.log(`H-1: ${judulBerakhir}`);
                }
            }
        }

        return res.status(200).json({
            message: "Send Notifikasi Berhasil",
            // data: investasis,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// // Create
// exports.create = async (req, res) => {
//     try {
//         const { judul, tanggal } = req.body;
//         console.log("asadada");

//         const notifikasi = await Notifikasi.create({
//             judul,
//             tanggal,
//         });

//         res.status(201).json({
//             message: "Notifikasi Berhasil ditambahkan!",
//             data: notifikasi,
//         });
//     } catch (error) {
//         if (error.name === "SequelizeValidationError") {
//             const messages = error.errors.map((err) => err.message);
//             res.status(400).json({
//                 message: "Validation error",
//                 errors: messages,
//             });
//         } else {
//             res.status(500).json({
//                 message: "Internal server error",
//                 error: error.message,
//             });
//         }
//     }
// };

// Read All
exports.findAll = async (req, res) => {
    try {
        const notifikasi = await Notifikasi.findAll();
        res.status(200).json({
            message: "Notifikasi berhasil diambil!",
            data: notifikasi,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// // Read One
// exports.findOne = async (req, res) => {
//     try {
//         const notifikasi = await Notifikasi.findByPk(req.params.id);
//         if (!notifikasi) {
//             return res.status(404).json({ message: "Notifikasi tidak ada!" });
//         }
//         res.status(200).json({
//             message: "Notifikasi berhasil diambil",
//             data: notifikasi,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// };

// // Update
// exports.update = async (req, res) => {
//     try {
//         const { judul, tanggal } = req.body;

//         const notifikasi = await Notifikasi.findByPk(req.params.id);

//         await notifikasi.update({
//             judul,
//             tanggal,
//         });

//         res.status(200).json({
//             message: "Notifikasi berhasil diperbaharui!",
//             data: notifikasi,
//         });
//     } catch (error) {
//         if (error.name === "SequelizeValidationError") {
//             const messages = error.errors.map((err) => err.message);
//             res.status(400).json({
//                 message: "Validation error",
//                 errors: messages,
//             });
//         } else {
//             res.status(500).json({
//                 message: "Internal server error",
//                 error: error.message,
//             });
//         }
//     }
// };

// // Delete
// exports.delete = async (req, res) => {
//     try {
//         const notifikasi = await Notifikasi.findByPk(req.params.id);
//         if (!notifikasi) {
//             return res.status(404).json({ message: "Notifikasi tidak ada!" });
//         }

//         await notifikasi.destroy();
//         res.status(200).json({
//             message: "Notifikasi berhasil dihapus",
//             data: notifikasi,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// };
