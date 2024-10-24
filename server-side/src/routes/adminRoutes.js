const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const { authenticateToken } = require("../middleware/authenticateToken");

const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/transaksiValidation");

router.get("/", authenticateToken("admin"), adminController.findAdminByAuth);
router.get(
    "/investor",
    authenticateToken("admin"),
    adminController.getAllDataInvestor
);
router.get(
    "/investor/:id",
    authenticateToken("admin"),
    adminController.getDetailDataInvestor
);
router.post(
    "/ubah-password",
    authenticateToken("admin"),
    adminController.ubahPassword
);
router.post(
    "/rejectVerifikasiProfile/:id",
    authenticateToken("admin"),
    adminController.rejectVerifiedProfile
);
router.post(
    "/VerifikasiProfile/:id",
    authenticateToken("admin"),
    adminController.verifiedProfile
);

router.post(
    "/create-transaction/",
    authenticateToken("admin"),
    validate(createSchema),
    adminController.createTransaction
);

module.exports = router;
