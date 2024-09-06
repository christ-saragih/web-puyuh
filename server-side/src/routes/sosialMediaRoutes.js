const express = require("express");
const router = express.Router();
const sosialMediaController = require("../controllers/sosialMediaController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/sosialMediaValidation");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post(
    "/",
    upload.single("icon"),
    authenticateToken("admin"),
    validateUploadFile({
        fieldName: "icon",
    }),
    validate(createSchema),
    sosialMediaController.create
);
router.put(
    "/:id",
    authenticateToken("admin"),
    upload.single("icon"),
    validateUploadFile({
        fieldName: "icon",
        required: false,
    }),
    validate(updateSchema),
    sosialMediaController.update
);
router.get("/", sosialMediaController.findAll);
router.get("/:id", sosialMediaController.findOne);
router.delete("/:id", authenticateToken("admin"), sosialMediaController.delete);
router.get("/image/:gambar", sosialMediaController.getImageByName);

module.exports = router;
