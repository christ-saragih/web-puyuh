const express = require("express");
const router = express.Router();
const investorAlamatController = require("../controllers/investorAlamatController");

const { authenticateToken } = require("../middleware/authenticateToken");

const validate = require("../middleware/validationMiddleware");
const { upsertSchema } = require("../validators/investorAlamatValidation");

// Create atau Update data Investor Alamat
router.post(
    "/",
    authenticateToken("investor"),
    validate(upsertSchema),
    investorAlamatController.upsert
);

// Get Data Investor Alamat Berdasarkan ID
router.get("/:id", investorAlamatController.findOne);

module.exports = router;
