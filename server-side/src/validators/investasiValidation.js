const { check } = require("express-validator");

const createSchema = [
    check("judul")
        .notEmpty()
        .withMessage("Judul tidak boleh kosong!")
        .isString()
        .withMessage("Judul harus berupa string!"),
    check("deskripsi")
        .notEmpty()
        .withMessage("Dekripsi tidak boleh kosong!")
        .isString()
        .withMessage("Dekripsi harus berupa string!"),
    check("alamat")
        .notEmpty()
        .withMessage("Alamat tidak boleh kosong!")
        .isString()
        .withMessage("Alamat harus berupa string!"),
    check("url_map")
        .notEmpty()
        .withMessage("Url Map tidak boleh kosong!")
        .isString()
        .withMessage("Url Map harus berupa string!"),
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
    check("bagi_hasil")
        .notEmpty()
        .withMessage("Bagi Hasil tidak boleh kosong!")
        .isFloat()
        .withMessage("Bagi Hasil harus berupa Float!"),
    check("minimum_investasi")
        .notEmpty()
        .withMessage("Minimum Investasi tidak boleh kosong!")
        .isInt()
        .withMessage("Minimum Investasi harus berupa Integer!"),
    check("maksimum_investasi")
        .notEmpty()
        .withMessage("Maksimum Investasi tidak boleh kosong!")
        .isInt()
        .withMessage("Maksimum Investasi harus berupa Integer!"),
    check("target_pendanaan")
        .notEmpty()
        .withMessage("Target Pendanaan tidak boleh kosong!")
        .isInt()
        .withMessage("Target Pendanaan harus berupa Integer!"),
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
];

const updateSchema = [
    check("judul").isString().withMessage("Judul harus berupa string!"),
    check("deskripsi").isString().withMessage("Deskripsi harus berupa string!"),
    check("alamat").isString().withMessage("Alamat harus berupa string!"),
    check("url_map").isString().withMessage("Url Map harus berupa string!"),
    check("penerbit").isString().withMessage("Penerbit harus berupa string!"),
    check("penggunaan_dana")
        .isString()
        .withMessage("Penggunaan Dana harus berupa string!"),
    check("bagi_hasil").isFloat().withMessage("Bagi Hasil harus berupa Float!"),
    check("minimum_investasi")
        .isInt()
        .withMessage("Minimum Investasi harus berupa integer!"),
    check("maksimum_investasi")
        .isInt()
        .withMessage("Maksimum Investasi harus berupa integer!"),
    check("target_pendanaan")
        .isInt()
        .withMessage("Target Pendanaan harus berupa integer!"),
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
