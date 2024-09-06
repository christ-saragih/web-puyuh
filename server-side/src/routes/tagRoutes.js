const express = require("express");
const router = express.Router();
const tagControlller = require("../controllers/tagControlller");

// auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/", authenticateToken("admin"), tagControlller.create);
router.put("/:id", authenticateToken("admin"), tagControlller.update);
router.get("/", tagControlller.findAll);
router.get("/:id", tagControlller.findOne);
router.delete("/:id", authenticateToken("admin"), tagControlller.delete);

module.exports = router;
