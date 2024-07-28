const express = require("express");
const router = express.Router();
const investorIndentitasController = require("../controllers/investorIdentitasController");
const {
    authenticateInvestorToken,
} = require("../middleware/authenticateInvestorToken");
const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/investorIdentitasValidation");

const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadMultipleFile,
} = require("../middleware/validationUploadMultipleFileMiddleware");

router.post(
    "/",
    authenticateInvestorToken,
    upload.fields([
        { name: "foto_ktp", maxCount: 1 },
        { name: "foto_npwp", maxCount: 1 },
        { name: "selfie_ktp", maxCount: 1 },
    ]),
    validateUploadMultipleFile({
        fieldName: "foto_ktp",
    }),
    validateUploadMultipleFile({
        fieldName: "foto_npwp",
    }),
    validateUploadMultipleFile({
        fieldName: "selfie_ktp",
    }),
    validate(createSchema),
    investorIndentitasController.create
);
router.put(
    "/:id",
    authenticateInvestorToken,
    upload.fields([
        { name: "foto_ktp", maxCount: 1 },
        { name: "foto_npwp", maxCount: 1 },
        { name: "selfie_ktp", maxCount: 1 },
    ]),
    validateUploadMultipleFile({ fieldName: "foto_ktp", required: false }),
    validateUploadMultipleFile({ fieldName: "foto_npwp", required: false }),
    validateUploadMultipleFile({ fieldName: "selfie_ktp", required: false }),
    validate(updateSchema),
    investorIndentitasController.update
);
router.get("/", investorIndentitasController.findAll);
router.get("/:id", investorIndentitasController.findOne);
router.delete("/:id", investorIndentitasController.delete);
router.get("/image/:imageName", investorIndentitasController.getImageByName);
module.exports = router;
