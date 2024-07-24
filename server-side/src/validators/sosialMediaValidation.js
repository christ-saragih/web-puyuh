const { check } = require("express-validator");

const createSchema = [
    check("nama")
        .notEmpty()
        .withMessage("Nama tidak boleh kosong!")
        .isString()
        .withMessage("Nama harus berupa string!"),
    check("url")
        .notEmpty()
        .withMessage("url tidak boleh kosong!")
        .isURL()
        .withMessage("url harus berupa url!"),
];

const updateSchema = [
    check("nama")
        .optional()
        .isString()
        .withMessage("Nama harus berupa string!"),
    check("url").optional().isURL().withMessage("url harus berupa url!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
