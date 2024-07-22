const { check } = require("express-validator");

const createSchema = [
    check("nama")
        .notEmpty()
        .withMessage("Nama tidak boleh kosong!")
        .isString()
        .withMessage("Nama harus berupa string!"),
    check("jabatan")
        .notEmpty()
        .withMessage("Jabatan tidak boleh kosong!")
        .isString()
        .withMessage("Jabatan harus berupa string!"),
    check("deskripsi")
        .notEmpty()
        .withMessage("Deskripsi tidak boleh kosong!")
        .isString()
        .withMessage("Deskripsi harus berupa string!"),
];

const updateSchema = [
    check("nama")
        .optional()
        .isString()
        .withMessage("Nama harus berupa string!"),
    check("jabatan")
        .optional()
        .isString()
        .withMessage("Jabatan harus berupa string!"),
    check("deskripsi")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa string!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
