const { check } = require("express-validator");

const createFaqSchema = [
    check("judul")
        .notEmpty()
        .withMessage("Judul tidak boleh kosong!")
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("deskripsi")
        .notEmpty()
        .withMessage("Deskripsi tidak boleh kosong!")
        .isString()
        .withMessage("Deskripsi harus berupa string!"),
    check("status")
        .notEmpty()
        .withMessage("Status tidak boleh kosong!")
        .isIn(["aktif", "tidak-aktif"])
        .withMessage("Status harus salah satu dari 'aktif' atau 'tidak-aktif'"),
];

const updateFaqSchema = [
    check("judul")
        .optional()
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("deskripsi")
        .optional()
        .isString()
        .withMessage("Deskripsi harus berupa string!"),
    check("status")
        .optional()
        .isIn(["aktif", "tidak-aktif"])
        .withMessage("Status harus salah satu dari 'aktif' atau 'tidak-aktif'"),
];

module.exports = {
    createFaqSchema,
    updateFaqSchema,
};
