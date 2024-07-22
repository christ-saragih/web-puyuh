const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const faqController = require("../controllers/faqController");

const {
    createFaqSchema,
    updateFaqSchema,
} = require("../validators/faqValidation");

router.post("/", validate(createFaqSchema), faqController.create);
router.get("/", faqController.getAll);
router.get("/:id", faqController.getOne);
router.put("/:id", validate(updateFaqSchema), faqController.update);
router.delete("/:id", faqController.delete);

module.exports = router;
