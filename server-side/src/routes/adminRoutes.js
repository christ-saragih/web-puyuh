const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const {
    authenticateToken,
    logout,
} = require("../middleware/authenticateToken");

router.get("/", authenticateToken("admin"), adminController.findAdminByAuth);
router.get("/", adminController.findAll);
router.get("/:id", adminController.findOne);
router.post(
    "/ubah-password",
    authenticateToken("admin"),
    adminController.ubahPassword
);

module.exports = router;
