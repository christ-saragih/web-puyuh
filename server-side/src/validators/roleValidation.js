const { check } = require("express-validator");

const createFaqSchema = [
    check("nama")
        .notEmpty()
        .withMessage("Nama tidak boleh kosong!")
        .isString()
        .withMessage("Nama harus berupa string!"),
];

const updateFaqSchema = [
    check("nama")
        .optional()
        .isString()
        .withMessage("Nama harus berupa string!"),
];

module.exports = {
    createFaqSchema,
    updateFaqSchema,
};
