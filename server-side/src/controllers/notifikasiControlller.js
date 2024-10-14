const { Investasi, Investor, Notifikasi } = require("../models");

const { exit } = require("process");
const { sendNotification } = require("../services/notifikasiService");
const cron = require("node-cron");

const sendNotificationIfNotExists = async (
    user,
    judul,
    tanggal,
    notifikasis
) => {
    // Cek apakah notifikasi dengan judul yang sama sudah ada
    const exists = notifikasis.some(
        (notifikasi) =>
            notifikasi.judul === judul && notifikasi.investor_id === user
    );

    if (!exists) {
        await sendNotification(user, judul, tanggal);
    }
};

// Fungsi untuk menghitung H-7, H-3, dan H-1 dari suatu tanggal
const calculateDaysBefore = (date, daysBefore) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - daysBefore);
    return newDate.toISOString().split("T")[0];
};

exports.sendNotificationInvestasi = async (req, res) => {
    try {
        const user = req.user.id;
        const investasis = await Investasi.findAll();
        const investors = await Investor.findAll();
        const notifikasis = await Notifikasi.findAll({
            where: { investor_id: user },
        });

        const today = new Date().toISOString().split("T")[0];

        for (let i = 0; i < investors.length; i++) {
            const investor = investors[i];

            if (investor.id === user) {
                await sendNotificationIfNotExists(
                    user,
                    `Selamat Datang ${investor.username} , Selamat Berinvestasi!`,
                    investor.createdAt,
                    notifikasis
                );
            }
        }

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
                        user,
                        `TELAH DIBUKA: ${judulPembukaan}`,
                        tanggalPembukaan,
                        notifikasis
                    );
                    console.log(judulPembukaan);
                }

                if (today === h7Pembukaan) {
                    await sendNotificationIfNotExists(
                        user,
                        `H-7: ${judulPembukaan} Segera dibuka!`,
                        tanggalPembukaan,
                        notifikasis
                    );
                    console.log(`H-7: ${judulPembukaan}`);
                }

                if (today === h3Pembukaan) {
                    await sendNotificationIfNotExists(
                        user,
                        `H-3: ${judulPembukaan} Segera dibuka!`,
                        tanggalPembukaan,
                        notifikasis
                    );
                    console.log(`H-3: ${judulPembukaan}`);
                }

                if (today === h1Pembukaan) {
                    await sendNotificationIfNotExists(
                        user,
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
                        user,
                        `TELAH BERAKHIR: ${judulBerakhir}`,
                        tanggalBerakhir,
                        notifikasis
                    );
                    console.log(judulBerakhir);
                }

                if (today === h7Berakhir) {
                    await sendNotificationIfNotExists(
                        user,
                        `H-7: ${judulBerakhir} segera berakhir!`,
                        tanggalBerakhir,
                        notifikasis
                    );
                    console.log(`H-7: ${judulBerakhir}`);
                }

                if (today === h3Berakhir) {
                    await sendNotificationIfNotExists(
                        user,
                        `H-3: ${judulBerakhir} segera berakhir!`,
                        tanggalBerakhir,
                        notifikasis
                    );
                    console.log(`H-3: ${judulBerakhir}`);
                }

                if (today === h1Berakhir) {
                    await sendNotificationIfNotExists(
                        user,
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

// cron.schedule("* * * * *", async () => {
//     try {
//         const investasis = await Investasi.findAll();
//         const investors = await Investor.findAll();
//         const today = new Date().toISOString().split("T")[0];

//         // Loop semua investor dan proses investasinya
//         for (let i = 0; i < investors.length; i++) {
//             const investor = investors[i];
//             const notifikasis = await Notifikasi.findAll({
//                 where: { investor_id: investor.id },
//             });

//             await sendNotificationIfNotExists(
//                 investor.id,
//                 `Selamat Datang ${investor.username} , Selamat Berinvestasi!`,
//                 investor.createdAt,
//                 notifikasis
//             );

//             // Proses setiap investasi
//             for (let j = 0; j < investasis.length; j++) {
//                 const investasi = investasis[j];

//                 const tanggalPembukaan = investasi.tanggal_pembukaan_penawaran;
//                 const tanggalBerakhir = investasi.tanggal_berakhir_penawaran;

//                 const judulPembukaan = `Investasi ${investasi.judul}`;
//                 const judulBerakhir = `Investasi ${investasi.judul}`;

//                 if (tanggalPembukaan) {
//                     const h7Pembukaan = calculateDaysBefore(
//                         tanggalPembukaan,
//                         7
//                     );
//                     const h3Pembukaan = calculateDaysBefore(
//                         tanggalPembukaan,
//                         3
//                     );
//                     const h1Pembukaan = calculateDaysBefore(
//                         tanggalPembukaan,
//                         1
//                     );

//                     if (today === tanggalPembukaan) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `TELAH DIBUKA: ${judulPembukaan}`,
//                             tanggalPembukaan,
//                             notifikasis
//                         );
//                     }
//                     if (today === h7Pembukaan) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `H-7: ${judulPembukaan} Segera dibuka!`,
//                             tanggalPembukaan,
//                             notifikasis
//                         );
//                     }
//                     if (today === h3Pembukaan) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `H-3: ${judulPembukaan} Segera dibuka!`,
//                             tanggalPembukaan,
//                             notifikasis
//                         );
//                     }
//                     if (today === h1Pembukaan) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `H-1: ${judulPembukaan} Segera dibuka!`,
//                             tanggalPembukaan,
//                             notifikasis
//                         );
//                     }
//                 }

//                 if (tanggalBerakhir) {
//                     const h7Berakhir = calculateDaysBefore(tanggalBerakhir, 7);
//                     const h3Berakhir = calculateDaysBefore(tanggalBerakhir, 3);
//                     const h1Berakhir = calculateDaysBefore(tanggalBerakhir, 1);

//                     if (today === tanggalBerakhir) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `TELAH BERAKHIR: ${judulBerakhir}`,
//                             tanggalBerakhir,
//                             notifikasis
//                         );
//                     }
//                     if (today === h7Berakhir) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `H-7: ${judulBerakhir} segera berakhir!`,
//                             tanggalBerakhir,
//                             notifikasis
//                         );
//                     }
//                     if (today === h3Berakhir) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `H-3: ${judulBerakhir} segera berakhir!`,
//                             tanggalBerakhir,
//                             notifikasis
//                         );
//                     }
//                     if (today === h1Berakhir) {
//                         await sendNotificationIfNotExists(
//                             investor.id,
//                             `H-1: ${judulBerakhir} segera berakhir!`,
//                             tanggalBerakhir,
//                             notifikasis
//                         );
//                     }
//                 }
//             }
//         }

//         console.log("Notifikasi sudah diproses.");
//     } catch (error) {
//         console.error("Error dalam mengirim notifikasi: ", error.message);
//     }
// });

// Read All
exports.findAll = async (req, res) => {
    try {
        const notifikasi = await Notifikasi.findAll({
            where: { investor_id: req.user.id },
        });
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

// Update Status
exports.changeStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifikasi = await Notifikasi.findAll({
            where: { investor_id: userId },
        });

        if (!notifikasi.length) {
            return res.status(404).json({
                message: "Notifikasi tidak ditemukan",
            });
        }

        // Update status notifikasi secara batch
        await Notifikasi.update(
            { status: true },
            { where: { investor_id: userId, status: false } } // Hanya update jika status belum true
        );

        res.status(200).json({
            message: "Status notifikasi berhasil diperbarui!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
