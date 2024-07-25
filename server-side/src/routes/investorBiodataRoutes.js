const express = require("express");
const router = express.Router();
const investorBiodataController = require("../controllers/investorBiodataController");
const validate = require("../middleware/validationMiddleware");

const {
    // createFaqSchema,
    updateSchema,
} = require("../validators/investorBiodataValidation");

// router.post("/", investorBiodataController.create);
router.put("/:id", investorBiodataController.update);
router.get("/", investorBiodataController.findAll);
router.get("/:id", investorBiodataController.findOne);
router.delete("/:id", investorBiodataController.delete);

module.exports = router;
