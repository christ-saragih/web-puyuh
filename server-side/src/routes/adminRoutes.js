const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const {
    authenticateAdminToken,
} = require("../middleware/authenticateAdminToken");
const authorizeRole = require("../middleware/authorizeRole");

router.get("/", adminController.findAll);
router.get("/:id", adminController.findOne);
router.post(
    "/ubah-password",
    authenticateAdminToken,
    authorizeRole("admin"),
    adminController.ubahPassword
);

module.exports = router;
