const express = require("express");
const router = express.Router();
const investorIndentitasController = require("../controllers/investorIdentitasController");

const { authenticateToken } = require("../middleware/authenticateToken");

const validate = require("../middleware/validationMiddleware");
const { upsertSchema } = require("../validators/investorIdentitasValidation");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadMultipleFile,
} = require("../middleware/validationUploadMultipleFileMiddleware");

// Create atau Update Data Investor Indentitas
router.post(
    "/",
    authenticateToken("investor"),
    upload.fields([
        { name: "foto_ktp", maxCount: 1 },
        { name: "foto_npwp", maxCount: 1 },
        { name: "selfie_ktp", maxCount: 1 },
    ]),
    validateUploadMultipleFile({ fieldName: "foto_ktp", required: false }),
    validateUploadMultipleFile({ fieldName: "foto_npwp", required: false }),
    validateUploadMultipleFile({ fieldName: "selfie_ktp", required: false }),
    validate(upsertSchema),
    investorIndentitasController.upsert
);

// Get Data Investor Identitas Berdasarkan ID
router.get("/:id", investorIndentitasController.findOne);

// Get Data Gambar Identitas Investor Identitas Berdasarkan Nama Gambar
router.get("/image/:imageName", investorIndentitasController.getImageByName);
module.exports = router;
