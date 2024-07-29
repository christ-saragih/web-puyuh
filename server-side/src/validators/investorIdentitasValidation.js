const { check } = require("express-validator");

const createSchema = [
    check("no_ktp")
        .notEmpty()
        .withMessage("No KTP tidak boleh kosong!")
        .isNumeric()
        .withMessage("No KTP harus berupa numerik!"),
    check("no_npwp")
        .notEmpty()
        .withMessage("No NPWP tidak boleh kosong!")
        .isNumeric()
        .withMessage("No NPWP harus berupa numerik!"),
];

const updateSchema = [
    check("no_ktp")
        .optional()
        .isNumeric()
        .withMessage("No KTP harus berupa string!"),
    check("no_npwp")
        .optional()
        .isNumeric()
        .withMessage("No NPWP harus berupa string!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
