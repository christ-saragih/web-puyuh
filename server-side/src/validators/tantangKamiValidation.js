const { check } = require("express-validator");

const createSchema = [
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
];

const updateSchema = [
    check("judul")
        .optional()
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("deskripsi")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa string!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
