const { check } = require("express-validator");

const registrasiSchema = [
    check("username").not().isEmpty().withMessage("Username harus diisi"),
    check("email").isEmail().withMessage("Email harus valid"),
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password minimal 8 karakter"),
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
