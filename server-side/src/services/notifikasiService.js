const { Notifikasi } = require("../models");
require("dotenv").config();

const sendNotification = async (judul, tanggal) => {
    try {
        const newJudul = `Investasi ${judul} Telah Dibuka`;
        await Notifikasi.create({ judul: newJudul, tanggal });
        console.log(
            `Notifikasi Berhasil di kirim dengan judul ${judul} dan tanggal ${tanggal}`
        );
    } catch (error) {
        console.error("Error sending Notification:", error);
    }
};

module.exports = { sendNotification };
