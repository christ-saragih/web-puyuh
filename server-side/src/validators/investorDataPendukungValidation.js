const { check } = require("express-validator");

const upsertSchema = [
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
    upsertSchema,
};
