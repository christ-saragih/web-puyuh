const express = require("express");
const router = express.Router();
const notifikasiControlller = require("../controllers/notifikasiControlller");

// auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post(
    "/notifikasiInvestasi/",
    authenticateToken("investor"),
    notifikasiControlller.sendNotificationInvestasi
);
router.get("/", notifikasiControlller.findAll);

module.exports = router;
