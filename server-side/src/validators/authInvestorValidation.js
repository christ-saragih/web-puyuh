const { check } = require("express-validator");

const registrasiSchema = [
    check("username").not().isEmpty().withMessage("Username harus diisi"),
    check("email").isEmail().withMessage("Email harus valid"),
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password minimal 8 karakter"),

    check("kategori_investor")
        .notEmpty()
        .withMessage("Kategori investor tidak boleh kosong!")
        .isIn(["individu", "organisasi"])
        .withMessage(
            "Kategori investor harus salah satu dari 'individu' atau 'organisasi'"
        ),
];

const loginSchema = [
    check("usernameOrEmail")
        .not()
        .isEmpty()
        .withMessage("Username atau Email harus diisi"),
    check("password").not().isEmpty().withMessage("Password harus diisi"),
];

module.exports = {
    registrasiSchema,
    loginSchema,
};
