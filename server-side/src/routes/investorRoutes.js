const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorController");

const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", investorController.findAll);
router.get("/:id", investorController.findOne);
router.post(
    "/ubah-password",
    authenticateToken("investor"),
    investorController.ubahPassword
);
router.get(
    "/transaksi/all",
    authenticateToken("investor"),
    investorController.getAllInvestorTransaction
);

module.exports = router;
