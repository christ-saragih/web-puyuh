const express = require("express");
const router = express.Router();
const dokumentasiControlller = require("../controllers/dokumentasiFrontapageController");
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/dokumentasiValidation");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");
router.post(
    "/",
    authenticateToken("admin"),
    upload.single("image"),
    validateUploadFile({
        fieldName: "image",
    }),
    validate(createSchema),
    dokumentasiControlller.create
);
router.put(
    "/:id",
    authenticateToken("admin"),
    upload.single("image"),
    validateUploadFile({
        fieldName: "image",
        required: false,
    }),
    validate(updateSchema),
    dokumentasiControlller.update
);
router.get("/", dokumentasiControlller.findAll);
router.get("/:id", dokumentasiControlller.findOne);
router.delete(
    "/:id",
    authenticateToken("admin"),
    dokumentasiControlller.delete
);
router.get("/image/:gambar", dokumentasiControlller.getImageByName);

module.exports = router;
