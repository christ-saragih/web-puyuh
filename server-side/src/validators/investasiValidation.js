const { check } = require("express-validator");

const createSchema = [
    check("judul")
        .notEmpty()
        .withMessage("Judul tidak boleh kosong!")
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("penerbit")
        .notEmpty()
        .withMessage("Penerbit tidak boleh kosong!")
        .isString()
        .withMessage("Penerbit harus berupa string!"),
    check("penggunaan_dana")
        .notEmpty()
        .withMessage("Penggunaan Dana tidak boleh kosong!")
        .isString()
        .withMessage("Penggunaan Dana harus berupa string!"),
    check("jaminan_kebendaan")
        .notEmpty()
        .withMessage("Jaminan Kebendaan tidak boleh kosong!")
        .isString()
        .withMessage("Jaminan Kebendaan harus berupa string!"),
    check("bagi_hasil")
        .notEmpty()
        .withMessage("Bagi Hasil tidak boleh kosong!")
        .isString()
        .withMessage("Bagi Hasil harus berupa string!"),
    check("minimum_investasi")
        .notEmpty()
        .withMessage("Minimum Investasi tidak boleh kosong!")
        .isFloat()
        .withMessage("Minimum Investasi harus berupa string!"),
    check("maksimum_investasi")
        .notEmpty()
        .withMessage("Maksimum Investasi tidak boleh kosong!")
        .isFloat()
        .withMessage("Maksimum Investasi harus berupa string!"),
    check("satuan_perdagangan")
        .notEmpty()
        .withMessage("Satuan Perdagangan tidak boleh kosong!")
        .isString()
        .withMessage("Satuan Perdagangan harus berupa string!"),
    check("minimum_pendanaan")
        .notEmpty()
        .withMessage("Minimum Pendanaan tidak boleh kosong!")
        .isFloat()
        .withMessage("Minimum Pendanaan harus berupa string!"),
    check("maksimum_pendanaan")
        .notEmpty()
        .withMessage("Maksimum Pendanaan tidak boleh kosong!")
        .isFloat()
        .withMessage("Maksimum Pendanaan harus berupa string!"),
    check("tenor")
        .notEmpty()
        .withMessage("Tenor tidak boleh kosong!")
        .isString()
        .withMessage("Tenor harus berupa string!"),
    check("pembayaran_bagi_hasil")
        .notEmpty()
        .withMessage("Pembayaran_bagi_hasil tidak boleh kosong!")
        .isString()
        .withMessage("Pembayaran_bagi_hasil harus berupa string!"),
    check("tanggal_pembukaan_penawaran")
        .notEmpty()
        .withMessage("Tanggal Pembukaan Penawaran tidak boleh kosong!")
        .isDate()
        .withMessage("Tanggal Pembukaan Penawaran harus berupa tanggal!"),
    check("tanggal_berakhir_penawaran")
        .notEmpty()
        .withMessage("Tanggal Berakhir Penawaran tidak boleh kosong!")
        .isDate()
        .withMessage("Tanggal Berakhir Penawaran harus berupa tanggal!"),
    check("status")
        .notEmpty()
        .withMessage("Status tidak boleh kosong!")
        .isIn(["segera", "proses", "selesai"])
        .withMessage(
            "Status harus salah satu dari 'segera' 'proses' atau 'selesai'"
        ),
];

const updateSchema = [
    check("judul").isString().withMessage("Judul harus berupa string!"),
    check("penerbit").isString().withMessage("Penerbit harus berupa string!"),
    check("penggunaan_dana")
        .isString()
        .withMessage("Penggunaan Dana harus berupa string!"),
    check("jaminan_kebendaan")
        .isString()
        .withMessage("Jaminan Kebendaan harus berupa string!"),
    check("bagi_hasil")
        .isString()
        .withMessage("Bagi Hasil harus berupa string!"),
    check("minimum_investasi")
        .isFloat()
        .withMessage("Minimum Investasi harus berupa string!"),
    check("maksimum_investasi")
        .isFloat()
        .withMessage("Maksimum Investasi harus berupa string!"),
    check("satuan_perdagangan")
        .isString()
        .withMessage("Satuan Perdagangan harus berupa string!"),
    check("minimum_pendanaan")
        .isFloat()
        .withMessage("Minimum Pendanaan harus berupa string!"),
    check("maksimum_pendanaan")
        .isFloat()
        .withMessage("Maksimum Pendanaan harus berupa string!"),
    check("tenor").isString().withMessage("Tenor harus berupa string!"),
    check("pembayaran_bagi_hasil")
        .isString()
        .withMessage("Pembayaran_bagi_hasil harus berupa string!"),
    check("tanggal_pembukaan_penawaran")
        .isDate()
        .withMessage("Tanggal Pembukaan Penawaran harus berupa tanggal!"),
    check("tanggal_berakhir_penawaran")
        .isDate()
        .withMessage("Tanggal Berakhir Penawaran harus berupa tanggal!"),
    check("status")
        .optional()
        .isIn(["segera", "proses", "selesai"])
        .withMessage(
            "Status harus salah satu dari 'segera' 'proses' atau 'selesai'"
        ),
];

module.exports = {
    createSchema,
    updateSchema,
};
