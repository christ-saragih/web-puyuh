const { check } = require("express-validator");

const createSchema = [
    check("investorId")
        .notEmpty()
        .withMessage("Id Investor tidak boleh kosong!")
        .isInt()
        .withMessage("Id Investor harus berupa Id!"),

    check("investasiId")
        .notEmpty()
        .withMessage("Id Investasi tidak boleh kosong!")
        .isInt()
        .withMessage("Id Investasi harus berupa Id!"),

    check("tanggal_transaksi")
        .notEmpty()
        .withMessage("Tanggal Transaksi tidak boleh kosong!")
        .isDate()
        .withMessage("Tanggal Transaksi harus berupa tanggal!"),

    check("total_investasi")
        .notEmpty()
        .withMessage("Total Investasi tidak boleh kosong!")
        .isInt()
        .withMessage("Total Investasi harus berupa Angka!"),

    check("nama_rekening")
        .notEmpty()
        .withMessage("Nama Rekening tidak boleh kosong!")
        .isString()
        .withMessage("Nama Rekening harus berupa String!"),

    check("no_rekening")
        .notEmpty()
        .withMessage("Nomor Rekening tidak boleh kosong!")
        .isInt()
        .withMessage("Nomor Rekening harus berupa Angka!"),

    check("status")
        .notEmpty()
        .withMessage("Status tidak boleh kosong!")
        .isIn(["gagal", "proses", "berhasil"])
        .withMessage(
            "Status harus salah satu dari 'gagal', 'proses' atau 'berhasil'"
        ),
];

const updateSchema = [
    check("investorId")
        .optional()
        .isInt()
        .withMessage("Id Investor harus berupa Id!"),

    check("investasiId")
        .optional()
        .isInt()
        .withMessage("Id Investasi harus berupa Id!"),

    check("tanggal_transaksi")
        .optional()
        .isDate()
        .withMessage("Tanggal Transaksi harus berupa Tanggal!"),

    check("total_investasi")
        .optional()
        .isInt()
        .withMessage("Total Investasi harus berupa Angka!"),

    check("nama_rekening")
        .optional()
        .isString()
        .withMessage("Nama Rekening harus berupa Id!"),

    check("no_rekening")
        .optional()
        .isInt()
        .withMessage("No Rekening harus berupa Angka!"),
    check("status")
        .optional()
        .isIn(["gagal", "proses", "berhasil"])
        .withMessage(
            "Status harus salah satu dari 'gagal' 'proses' atau 'berhasil'"
        ),
];

module.exports = {
    createSchema,
    updateSchema,
};
