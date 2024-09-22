const express = require("express");
const router = express.Router();
const investorBiodataController = require("../controllers/investorBiodataController");
const validate = require("../middleware/validationMiddleware");

const { upsertSchema } = require("../validators/investorBiodataValidation");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");
const { authenticateToken } = require("../middleware/authenticateToken");

// Create atau Update Investor Biodata
router.post(
    "/",
    authenticateToken("investor"),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
        required: false,
    }),
    validate(upsertSchema),
    investorBiodataController.upsert
);

// Get Data Investor Biodata Berdasarkan Id
router.get("/:id", investorBiodataController.findOne);

// Get Foto Profile Investor Berdasarkan Nama Gambar
router.get("/images/:gambar", investorBiodataController.getImageByName);

module.exports = router;
