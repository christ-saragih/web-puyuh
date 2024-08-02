const { check } = require("express-validator");

const createSchema = [
    check("nama_lengkap")
        .notEmpty()
        .withMessage("Nama Lengkap tidak boleh kosong!")
        .isString()
        .withMessage("Nama Lengkap harus berupa string!"),
    check("jk")
        .notEmpty()
        .withMessage("Jenis Kelamin tidak boleh kosong!")
        .isIn(["pria", "wanita"])
        .withMessage(
            "Jenis Kelamin harus salah satu dari 'pria' atau 'wanita'"
        ),
    check("tempat_lahir")
        .notEmpty()
        .withMessage("Tempat Lahir tidak boleh kosong!")
        .isString()
        .withMessage("Tempat Lahir harus berupa string!"),
    check("tanggal_lahir")
        .notEmpty()
        .withMessage("Tanggal Lahir tidak boleh kosong!")
        .isDate()
        .withMessage("Tanggal Lahir harus berupa tanggal!"),
    check("no_hp")
        .notEmpty()
        .withMessage("Nomor handphone tidak boleh kosong!")
        .isNumeric()
        .withMessage("Nomor handphone harus numerik!"),
];

const updateSchema = [
    check("nama_lengkap")
        .optional()
        .isString()
        .withMessage("Nama Lengkap harus berupa string!"),
    check("jk")
        .optional()
        .isIn(["pria", "wanita"])
        .withMessage(
            "Jenis Kelamin harus salah satu dari 'pria' atau 'wanita'"
        ),
    check("tempat_lahir")
        .optional()
        .isString()
        .withMessage("Tempat Lahir harus berupa string!"),
    check("tanggal_lahir")
        .optional()
        .isDate()
        .withMessage("Tanggal Lahir harus berupa tanggal!"),
    check("no_hp")
        .optional()
        .isNumeric()
        .withMessage("Nomor handphone harus numerik!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
