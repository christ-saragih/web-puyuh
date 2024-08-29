const express = require("express");
const router = express.Router();
const investasiController = require("../controllers/investasiController");
const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/investasiValidation");

// auth
const {
    authenticateAdminToken,
} = require("../middleware/authenticateAdminToken");
const authorizeRole = require("../middleware/authorizeRole");
const { authenticateToken } = require("../middleware/authenticateToken");

// Upload gambar
const upload = require("../middleware/uploadFileMiddleware");
const {
    validateUploadFile,
} = require("../middleware/validationUploadFileMiddleware");

router.post(
    "/",
    authenticateAdminToken,
    authorizeRole("admin"),
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
// router.get("/:id", investasiController.findOne);
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
// router.get(
//     "/:investasiId/investor/:id",
//     investasiController.getOneTransactionByInvestasiId
// );
router.get("/:slug", investasiController.findDataBySlug);
router.delete("/:id", investasiController.delete);
router.get("/image/:gambar", investasiController.getImageByName);
router.get("/filter/status", investasiController.getInvestasiByStatus);

module.exports = router;
