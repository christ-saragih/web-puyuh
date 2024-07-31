const express = require("express");
const router = express.Router();
const adminBiodataController = require("../controllers/adminController");

const {
    authenticateAdminToken,
} = require("../middleware/authenticateAdminToken");
const authorizeRole = require("../middleware/authorizeRole");

router.get("/", adminBiodataController.findAll);
router.get("/:id", adminBiodataController.findOne);

module.exports = router;
