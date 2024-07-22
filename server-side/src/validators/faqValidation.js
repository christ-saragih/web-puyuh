const { check } = require("express-validator");

const createFaqSchema = [
    check("pertanyaan")
        .notEmpty()
        .withMessage("Pertanyaan tidak boleh kosong!")
        .isString()
        .withMessage("Pertanyaan harus berupa string!"),
    check("jawaban")
        .notEmpty()
        .withMessage("Jawaban tidak boleh kosong!")
        .isString()
        .withMessage("Jawaban harus berupa string!"),
    check("status")
        .notEmpty()
        .withMessage("Status tidak boleh kosong!")
        .isIn(["aktif", "tidak-aktif"])
        .withMessage("Status harus salah satu dari 'aktif' atau 'tidak-aktif'"),
];

const updateFaqSchema = [
    check("pertanyaan")
        .optional()
        .isString()
        .withMessage("Pertanyaan harus berupa string!"),
    check("Jawaban")
        .optional()
        .isString()
        .withMessage("Jawaban harus berupa string!"),
    check("status")
        .optional()
        .isIn(["aktif", "tidak-aktif"])
        .withMessage("Status harus salah satu dari 'aktif' atau 'tidak-aktif'"),
];

module.exports = {
    createFaqSchema,
    updateFaqSchema,
};
