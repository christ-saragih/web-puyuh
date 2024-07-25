const { check } = require("express-validator");

const createSchema = [
    check("nama")
        .notEmpty()
        .withMessage("Nama tidak boleh kosong!")
        .isString()
        .withMessage("Nama harus berupa string!"),
];

const updateSchema = [
    check("nama")
        .optional()
        .isString()
        .withMessage("Nama harus berupa string!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
