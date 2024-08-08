const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorController");

const {
    authenticateInvestorToken,
} = require("../middleware/authenticateInvestorToken");
const authorizeRole = require("../middleware/authorizeRole");

router.get("/", investorController.findAll);
router.get("/:id", investorController.findOne);
router.post(
    "/ubah-password",
    authenticateInvestorToken,
    authorizeRole("investor"),
    investorController.ubahPassword
);

module.exports = router;
