const express = require("express");
const router = express.Router();
const adminBiodataController = require("../controllers/adminBiodataController");
const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/adminBiodataValidation");

const {
    authenticateAdminToken,
} = require("../middleware/authenticateAdminToken");
const authorizeRole = require("../middleware/authorizeRole");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    authenticateAdminToken,
    authorizeRole("admin"),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
    }),
    validate(createSchema),
    adminBiodataController.create
);
router.put(
    "/:id",
    authenticateAdminToken,
    validate(updateSchema),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
    }),
    adminBiodataController.update
);
router.get("/", adminBiodataController.findAll);
router.get("/:id", adminBiodataController.findOne);
router.delete("/:id", adminBiodataController.delete);

module.exports = router;
