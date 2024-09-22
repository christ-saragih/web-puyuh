const express = require("express");
const router = express.Router();
const investorDataPendukungController = require("../controllers/investorDataPendukungController");

const { authenticateToken } = require("../middleware/authenticateToken");

const validate = require("../middleware/validationMiddleware");
const {
    upsertSchema,
} = require("../validators/investorDataPendukungValidation");

// Create atau Update Data Investor Data Pendukung
router.post(
    "/",
    authenticateToken("investor"),
    validate(upsertSchema),
    investorDataPendukungController.upsert
);

// Get Data Pendukung Investor Berdasarkan Id
router.get("/:id", investorDataPendukungController.findOne);

module.exports = router;
