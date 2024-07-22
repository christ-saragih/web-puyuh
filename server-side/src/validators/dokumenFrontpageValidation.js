const { check } = require("express-validator");

const createSchema = [
    check("nama")
        .notEmpty()
        .withMessage("nama tidak boleh kosong!")
        .isString()
        .withMessage("nama harus berupa string!"),
    check("status")
        .notEmpty()
        .withMessage("Status tidak boleh kosong!")
        .isIn(["aktif", "tidak-aktif"])
        .withMessage("Status harus salah satu dari 'aktif' atau 'tidak-aktif'"),
];

const updateSchema = [
    check("nama")
        .optional()
        .isString()
        .withMessage("nama harus berupa string!"),
    check("status").optional(),
];

module.exports = {
    createSchema,
    updateSchema,
};
