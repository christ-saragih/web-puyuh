const { check } = require("express-validator");

const upsertSchema = [
    check("alamat")
        .notEmpty()
        .withMessage("Alamat Tidak Boleh Kosong!")
        .isString()
        .withMessage("Alamat harus berupa string!"),
    check("url_map")
        .notEmpty()
        .withMessage("Url Map Tidak Boleh Kosong!")
        .isString()
        .withMessage("Url Map harus berupa string!"),
    check("email")
        .notEmpty()
        .withMessage("Email Tidak Boleh Kosong!")
        .isEmail()
        .withMessage("Email harus berupa Email!"),
    check("no_phone")
        .notEmpty()
        .withMessage("No HP Tidak Boleh Kosong!")
        .isMobilePhone("id-ID")
        .withMessage("Nomor HP Indonesia!"),
];

module.exports = {
    upsertSchema,
};
