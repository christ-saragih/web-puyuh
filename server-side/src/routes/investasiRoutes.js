const express = require("express");
const router = express.Router();
const investasiController = require("../controllers/investasiController");
const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/investasiValidation");

// auth
const { authenticateToken } = require("../middleware/authenticateToken");

// Upload gambar
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    authenticateToken("admin"),
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
    }),
    validate(createSchema),
    investasiController.create
);
router.put(
    "/:id",
    authenticateToken("admin"),
    upload.single("gambar"),
    validateUploadFile({
        fieldName: "gambar",
        required: false,
    }),
    validate(updateSchema),
    investasiController.update
);
router.get("/", investasiController.findAll);
router.get(
    "/:investasiId/transaksi",
    investasiController.getAllTransactionByInvestasiId
);
router.get(
    "/:investasiId/transaksi/:id",
    investasiController.getOneTransactionByInvestasiId
);
router.get(
    "/:investasiId/investor",
    investasiController.getAllInvestorByInvestasiId
);
router.get("/:slug", investasiController.findDataBySlug);
router.delete("/:id", authenticateToken("admin"), investasiController.delete);
router.get("/image/:gambar", investasiController.getImageByName);
router.get("/filter/status", investasiController.getInvestasiByStatus);
router.get("/total/investment", investasiController.getTotalInvestment);
module.exports = router;
