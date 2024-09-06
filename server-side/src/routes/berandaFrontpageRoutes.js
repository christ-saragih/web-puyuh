const express = require("express");
const router = express.Router();

// Controller
const berandaController = require("../controllers/berandaFrontpageController");

// Upload file
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

// Validate data http
const validate = require("../middleware/validationMiddleware");
const { upsertSchema } = require("../validators/berandaFrontpageValidation");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post(
    "/",
    authenticateToken("admin"),
    upload.single("image_header"),
    validateUploadFile({
        fieldName: "image_header",
        required: false,
    }),
    validate(upsertSchema),
    berandaController.upsert
);
router.get("/", berandaController.findData);
// router.delete("/:id", berandaController.delete);
router.get("/image/:gambar", berandaController.getImageByName);

module.exports = router;
