const { check } = require("express-validator");

const upsertSchema = [
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
    upsertSchema,
};
