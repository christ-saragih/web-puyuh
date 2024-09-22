// routes/artikelRoutes.js
const express = require("express");
const router = express.Router();
const sejarahController = require("../controllers/sejarahController");
const validate = require("../middleware/validationMiddleware");
const { upsertSchema } = require("../validators/sejarahValidation");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post(
    "/",
    authenticateToken("admin"),
    validate(upsertSchema),
    sejarahController.upsert
);
router.get("/", sejarahController.findData);

module.exports = router;
