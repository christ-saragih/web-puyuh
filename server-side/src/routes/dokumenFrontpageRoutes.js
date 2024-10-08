// routes/artikelRoutes.js
const express = require("express");
const router = express.Router();
const dokumenFrontpageController = require("../controllers/dokumenFrontpageController");
const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/dokumenFrontpageValidation");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post(
    "/",
    authenticateToken("admin"),
    upload.single("file"),
    validateUploadFile({
        fieldName: "file",
        allowedFileTypes: /pdf/,
        maxFileSize: 1024 * 1024 * 10,
    }),
    validate(createSchema),
    dokumenFrontpageController.create
);
router.put(
    "/:id",
    authenticateToken("admin"),
    upload.single("file"),
    validateUploadFile({
        fieldName: "file",
        allowedFileTypes: /pdf/,
        maxFileSize: 1024 * 1024 * 10,
        required: false,
    }),
    validate(updateSchema),
    dokumenFrontpageController.update
);
router.get("/", dokumenFrontpageController.findAll);
router.get("/:id", dokumenFrontpageController.findOne);
router.delete(
    "/:id",
    authenticateToken("admin"),
    dokumenFrontpageController.delete
);
router.get("/file/:file", dokumenFrontpageController.getFileByName);

module.exports = router;
