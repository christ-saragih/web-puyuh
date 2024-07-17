const express = require("express");
const router = express.Router();
const berandaController = require("../controllers/berandaFrontpageController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");
router.post(
    "/",
    upload.single("image_header"),
    validateUploadFile({
        fieldName: "image_header",
        allowedFileTypes: /jpeg|jpg|png/,
        maxFileSize: 1024 * 1024 * 5, // 5MB
        required: true,
    }),
    berandaController.create
);
router.put(
    "/:id",
    upload.single("image_header"),
    validateUploadFile({
        fieldName: "image_header",
        required: false,
    }),
    berandaController.update
);
router.get("/", berandaController.findAll);
router.get("/:id", berandaController.findOne);
router.delete("/:id", berandaController.delete);

module.exports = router;
