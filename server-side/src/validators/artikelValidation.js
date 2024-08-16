const { check } = require("express-validator");

const createSchema = [
    check("penulis")
        .notEmpty()
        .withMessage("Penulis tidak boleh kosong!")
        .isString()
        .withMessage("Penulis harus berupa string!"),
    check("judul")
        .notEmpty()
        .withMessage("Judul tidak boleh kosong!")
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("deskripsi")
        .notEmpty()
        .withMessage("Deskripsi tidak boleh kosong!")
        .isString()
        .withMessage("Deskripsi harus berupa string!"),
    check("tanggal")
        .notEmpty()
        .withMessage("Tanggal tidak boleh kosong!")
        .isDate()
        .withMessage("Tanggal harus berupa tanggal!"),
    check("tags").notEmpty().withMessage("Tag tidak boleh kosong!"),
];

const updateSchema = [
    check("penulis")
        .optional()
        .isString()
        .withMessage("Penulis harus berupa string!"),
    check("judul")
        .optional()
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("deskripsi")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa string!"),
    check("tanggal")
        .optional()
        .isDate()
        .withMessage("Tanggal harus berupa tanggal!"),
    check("tags").optional(),
];

module.exports = {
    createSchema,
    updateSchema,
};
