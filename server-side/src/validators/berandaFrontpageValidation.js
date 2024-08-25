const { check } = require("express-validator");

const upsertSchema = [
    check("nama_header")
        .notEmpty()
        .withMessage("Nama Header tidak boleh kosong!")
        .isString()
        .withMessage("Nama Header harus berupa string!"),
    check("nama_subheader")
        .notEmpty()
        .withMessage("Nama Sub Header tidak boleh kosong!")
        .isString()
        .withMessage("Nama Sub Header harus berupa string!"),
];

module.exports = {
    upsertSchema,
};
