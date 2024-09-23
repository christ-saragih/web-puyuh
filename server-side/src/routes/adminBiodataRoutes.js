const express = require("express");
const router = express.Router();
const adminBiodataController = require("../controllers/adminBiodataController");
const validate = require("../middleware/validationMiddleware");

const { upsertSchema } = require("../validators/adminBiodataValidation");

const { authenticateToken } = require("../middleware/authenticateToken");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

// Create Atau Update Data Admin Biodata
router.post(
    "/",
    authenticateToken("admin"),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
        required: false,
    }),
    validate(upsertSchema),
    adminBiodataController.upsert
);

// Get Data Admin Biodata Berdasarkan Id
router.get("/:id", adminBiodataController.findOne);

// Get Foto Profile Admin Berdasarkan Nama Gambar
router.get("/images/:gambar", adminBiodataController.getImageByName);

module.exports = router;
