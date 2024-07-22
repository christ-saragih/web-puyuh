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
    validate(createSchema),
    upload.single("file"),
    validateUploadFile({
        fieldName: "file",
        allowedFileTypes: /pdf/,
    }),
    dokumenFrontpageController.create
);
router.put(
    "/:id",
    validate(updateSchema),
    upload.single("file"),
    validateUploadFile({
        fieldName: "file",
        allowedFileTypes: /pdf/,
    }),
    dokumenFrontpageController.update
);
router.get("/", dokumenFrontpageController.findAll);
router.get("/:id", dokumenFrontpageController.findOne);
router.delete("/:id", dokumenFrontpageController.delete);

module.exports = router;
