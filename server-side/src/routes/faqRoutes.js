const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const faqController = require("../controllers/faqController");

const {
    createFaqSchema,
    updateFaqSchema,
} = require("../validators/faqValidation");

// Auth
const { authenticateToken } = require("../middleware/authenticateToken");

router.post(
    "/",
    authenticateToken("admin"),
    validate(createFaqSchema),
    faqController.create
);
router.get("/", faqController.getAll);
router.get("/:id", faqController.getOne);
router.put(
    "/:id",
    authenticateToken("admin"),
    validate(updateFaqSchema),
    faqController.update
);
router.delete("/:id", authenticateToken("admin"), faqController.delete);

module.exports = router;
