const express = require("express");
const router = express.Router();
const kontakFrontpageController = require("../controllers/kontakFrontpageController");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");

const { upsertSchema } = require("../validators/kontakFrontpageValidation");
const validate = require("../middleware/validationMiddleware");

router.post(
    "/",
    authenticateToken("admin"),
    validate(upsertSchema),
    kontakFrontpageController.upsert
);
router.get("/", kontakFrontpageController.findData);

module.exports = router;
