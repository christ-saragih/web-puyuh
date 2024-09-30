const { Notifikasi } = require("../models");
require("dotenv").config();

const sendNotification = async (user, judul, tanggal) => {
    try {
        await Notifikasi.create({ investor_id: user, judul, tanggal });
        console.log(
            `Notifikasi Berhasil di kirim dengan judul ${judul} dan tanggal ${tanggal}`
        );
    } catch (error) {
        console.error("Error sending Notification:", error);
    }
};

module.exports = { sendNotification };
