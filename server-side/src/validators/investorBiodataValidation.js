const { check } = require("express-validator");

const upsertSchema = [
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

    check("email").optional().isEmail().withMessage("Email harus valid"),
];

module.exports = {
    upsertSchema,
};
