const express = require("express");
const router = express.Router();
const transaksiController = require("../controllers/transaksiController");

// auth
const {
    authenticateInvestorToken,
} = require("../middleware/authenticateInvestorToken");
const authorizeRole = require("../middleware/authorizeRole");

router.post(
    "/:id",
    authenticateInvestorToken,
    authorizeRole("investor"),
    transaksiController.transaction
);
router.get("/", transaksiController.getAllTransaction);
router.get("/:id", transaksiController.getTransactionById);
router.put("/:id", transaksiController.updateTransaction);
router.delete("/:id", transaksiController.deleteTransaction);

module.exports = router;
