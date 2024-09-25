const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorController");

const { authenticateToken } = require("../middleware/authenticateToken");

router.get(
    "/",
    authenticateToken("investor"),
    investorController.findInvestorByAuth
);
router.get("/:id", investorController.findOne);
router.post(
    "/ubah-password",
    authenticateToken("investor"),
    investorController.ubahPassword
);
router.get(
    "/me/transaksi/",
    authenticateToken("investor"),
    investorController.getAllInvestorTransaction
);
router.get(
    "/transaksi/:transaksiId",
    authenticateToken("investor"),
    investorController.getDetailInvestorTransaction
);

module.exports = router;
