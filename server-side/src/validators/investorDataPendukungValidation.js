const { check } = require("express-validator");

const createSchema = [
    check("latar_pendidikan")
        .notEmpty()
        .withMessage("Latar Pendidikan tidak boleh kosong!")
        .isString()
        .withMessage("Latar Pendidikan harus berupa string!"),
    check("sumber_penghasilan")
        .notEmpty()
        .withMessage("Sumber Penghasilan tidak boleh kosong!")
        .isString()
        .withMessage("Sumber Penghasilan harus berupa string!"),
    check("jumlah_penghasilan")
        .notEmpty()
        .withMessage("Jumlah Penghasilan tidak boleh kosong!")
        .isString()
        .withMessage("Jumlah Penghasilan harus berupa string!"),
    check("bidang_usaha")
        .notEmpty()
        .withMessage("Bidang Usaha tidak boleh kosong!")
        .isString()
        .withMessage("Bidang Usaha harus berupa string!"),
    check("tujuan_investasi")
        .notEmpty()
        .withMessage("Tujuan Investasi tidak boleh kosong!")
        .isString()
        .withMessage("Tujuan Investasi harus berupa string!"),
    check("no_sid")
        .notEmpty()
        .withMessage("Nomor SID tidak boleh kosong!")
        .isString()
        .withMessage("Nomor SID harus berupa string!"),
    check("tanggal_pembuatan_sid")
        .notEmpty()
        .withMessage("Tanggal Pembuatan SID tidak boleh kosong!")
        .isDate()
        .withMessage("Tanggal Pembuatan SID harus berupa Tanggal!"),
];

const updateSchema = [
    check("latar_pendidikan")
        .optional()
        .isString()
        .withMessage("Latar Pendidikan harus berupa string!"),
    check("sumber_penghasilan")
        .optional()
        .isString()
        .withMessage("Sumber Penghasilan harus berupa string!"),
    check("jumlah_penghasilan")
        .optional()
        .isString()
        .withMessage("Jumlah Penghasilan harus berupa string!"),
    check("bidang_usaha")
        .optional()
        .isString()
        .withMessage("Bidang Usaha harus berupa string!"),
    check("tujuan_investasi")
        .optional()
        .isString()
        .withMessage("Tujuan Investasi harus berupa string!"),
    check("no_sid")
        .optional()
        .isString()
        .withMessage("Nomor SID harus berupa string!"),
    check("tanggal_pembuatan_sid")
        .optional()
        .isDate()
        .withMessage("Tanggal Pembuatan SID harus berupa tanggal!"),
];

module.exports = {
    createSchema,
    updateSchema,
};
