// routes/artikelRoutes.js
const express = require("express");
const router = express.Router();
const sejarahController = require("../controllers/sejarahController");
const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/sejarahValidation");

router.post("/", validate(createSchema), sejarahController.create);
router.put("/:id", validate(updateSchema), sejarahController.update);
router.get("/", sejarahController.findAll);
router.get("/:id", sejarahController.findOne);
router.delete("/:id", sejarahController.delete);

module.exports = router;
