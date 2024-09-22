const { check } = require("express-validator");

const upsertSchema = [
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
    upsertSchema,
};
