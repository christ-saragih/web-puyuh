const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const { authenticateToken } = require("../middleware/authenticateToken");

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

module.exports = router;
