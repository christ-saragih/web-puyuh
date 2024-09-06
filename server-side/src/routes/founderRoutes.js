const express = require("express");
const router = express.Router();
const founderController = require("../controllers/founderController");

const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/founderValidation");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post(
    "/",
    authenticateToken("admin"),
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
    }),
    validate(createSchema),
    founderController.create
);
router.put(
    "/:id",
    authenticateToken("admin"),
    validate(updateSchema),
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
        required: false,
    }),
    founderController.update
);
router.get("/", founderController.findAll);
router.get("/:id", founderController.findOne);
router.delete("/:id", authenticateToken("admin"), founderController.delete);
router.get("/image/:gambar", founderController.getImageByName);

module.exports = router;
