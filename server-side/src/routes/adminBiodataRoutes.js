const express = require("express");
const router = express.Router();
const adminBiodataController = require("../controllers/adminBiodataController");
const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/adminBiodataValidation");

const { authenticateToken } = require("../middleware/authenticateToken");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    authenticateToken("admin"),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
    }),
    validate(createSchema),
    adminBiodataController.create
);
router.put(
    "/:id",
    authenticateToken("admin"),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
    }),
    adminBiodataController.update
);
router.get("/", adminBiodataController.findAll);
router.get("/:id", adminBiodataController.findOne);
router.delete("/:id", adminBiodataController.delete);
router.get("/images/:gambar", adminBiodataController.getImageByName);

module.exports = router;
