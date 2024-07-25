const { check } = require("express-validator");

const updateSchema = [
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
    check("kategori_investor")
        .notEmpty()
        .withMessage("Kategori investor tidak boleh kosong!")
        .isIn(["individu", "organisasi"])
        .withMessage(
            "Kategori investor harus salah satu dari 'individu' atau 'organisasi'"
        ),
];

// const updateSchema = [
//     check("penulis")
//         .optional()
//         .isString()
//         .withMessage("Penulis harus berupa string!"),
//     check("judul")
//         .optional()
//         .isString()
//         .withMessage("Judul harus berupa string!"),
//     check("deskripsi")
//         .optional()
//         .isString()
//         .withMessage("Deskripsi harus berupa string!"),
//     check("tanggal")
//         .optional()
//         .isDate()
//         .withMessage("Tanggal harus berupa string!"),
//     check("tags").optional(),
// ];

module.exports = {
    // createSchema,
    updateSchema,
};
