const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const roleController = require("../controllers/roleController");

const {
    createFaqSchema,
    updateFaqSchema,
} = require("../validators/roleValidation");

router.post("/", validate(createFaqSchema), roleController.create);
router.get("/", roleController.getAll);
router.get("/:id", roleController.getOne);
router.put("/:id", validate(updateFaqSchema), roleController.update);
router.delete("/:id", roleController.delete);

module.exports = router;
