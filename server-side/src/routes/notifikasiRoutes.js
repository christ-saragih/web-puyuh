const express = require("express");
const router = express.Router();
const notifikasiControlller = require("../controllers/notifikasiControlller");

// auth
const { authenticateToken } = require("../middleware/authenticateToken");

// router.post("/", authenticateToken("admin"), notifikasiControlller.create);
// router.put("/:id", authenticateToken("admin"), notifikasiControlller.update);
router.get("/", notifikasiControlller.findAll);
// router.get("/:id", notifikasiControlller.findOne);
// router.delete("/:id", authenticateToken("admin"), notifikasiControlller.delete);

module.exports = router;
