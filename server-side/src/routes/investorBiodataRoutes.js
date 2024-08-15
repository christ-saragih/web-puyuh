const express = require("express");
const router = express.Router();
const investorBiodataController = require("../controllers/investorBiodataController");
const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/investorBiodataValidation");

const {
    authenticateInvestorToken,
} = require("../middleware/authenticateInvestorToken");
const authorizeRole = require("../middleware/authorizeRole");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    authenticateInvestorToken,
    authorizeRole("investor"),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
    }),
    validate(createSchema),
    investorBiodataController.create
);
router.put(
    "/:id",
    authenticateInvestorToken,
    authorizeRole("investor"),
    validate(updateSchema),
    upload.single("foto_profil"),
    validateUploadFile({
        fieldName: "foto_profil",
        required: false,
    }),
    investorBiodataController.update
);
router.get("/", investorBiodataController.findAll);
router.get("/:id", investorBiodataController.findOne);
router.delete("/:id", investorBiodataController.delete);
router.get("/images/:gambar", investorBiodataController.getImageByName);

module.exports = router;
