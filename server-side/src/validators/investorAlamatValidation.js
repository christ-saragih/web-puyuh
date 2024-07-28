const { check } = require("express-validator");

const createSchema = [
    check("alamat")
        .notEmpty()
        .withMessage("Alamat tidak boleh kosong!")
        .isString()
        .withMessage("Alamat harus berupa string!"),
    check("provinsi")
        .notEmpty()
        .withMessage("Provinsi tidak boleh kosong!")
        .isString()
        .withMessage("Provinsi harus berupa string!"),
    check("kota")
        .notEmpty()
        .withMessage("Kota tidak boleh kosong!")
        .isString()
        .withMessage("Kota harus berupa string!"),
    check("kecamatan")
        .notEmpty()
        .withMessage("Kecamatan tidak boleh kosong!")
        .isString()
        .withMessage("Kecamatan harus berupa string!"),
    check("kelurahan")
        .notEmpty()
        .withMessage("Kelurahan tidak boleh kosong!")
        .isString()
        .withMessage("Kelurahan harus berupa string!"),
    check("kode_pos")
        .notEmpty()
        .withMessage("Kode pos tidak boleh kosong!")
        .isString()
        .withMessage("Kode pos harus berupa string!"),
];

const updateSchema = [
    check("alamat")
        .optional()
        .isString()
        .withMessage("Alamat harus berupa string!"),
    check("provinsi")
        .optional()
        .isString()
        .withMessage("Provinsi harus berupa string!"),
    check("kota")
        .optional()
        .isString()
        .withMessage("Kota harus berupa string!"),
    check("kecamatan")
        .optional()
        .isString()
        .withMessage("Kecamatan harus berupa string!"),
    check("kelurahan")
        .optional()
        .isString()
        .withMessage("Kelurahan harus berupa string!"),
    check("kode_pos")
        .optional()
        .isString()
        .withMessage("Kode pos harus berupa string!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
