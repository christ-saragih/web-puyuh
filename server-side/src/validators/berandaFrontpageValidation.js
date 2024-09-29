const { check } = require("express-validator");

const upsertSchema = [
    check("judul")
        .notEmpty()
        .withMessage("Judul tidak boleh kosong!")
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("subJudul")
        .notEmpty()
        .withMessage("Sub Judul tidak boleh kosong!")
        .isString()
        .withMessage("Sub Judul harus berupa string!"),
];

module.exports = {
    upsertSchema,
};
