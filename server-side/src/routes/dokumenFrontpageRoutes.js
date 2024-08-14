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

router.post(
    "/",
    upload.single("file"),
    validateUploadFile({
        fieldName: "file",
        allowedFileTypes: /pdf/,
    }),
    validate(createSchema),
    dokumenFrontpageController.create
);
router.put(
    "/:id",
    upload.single("file"),
    validateUploadFile({
        fieldName: "file",
        allowedFileTypes: /pdf/,
        required: false,
    }),
    validate(updateSchema),
    dokumenFrontpageController.update
);
router.get("/", dokumenFrontpageController.findAll);
router.get("/:id", dokumenFrontpageController.findOne);
router.delete("/:id", dokumenFrontpageController.delete);
router.get("/file/:file", dokumenFrontpageController.getFileByName);

module.exports = router;
