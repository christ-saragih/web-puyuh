// routes/artikelRoutes.js
const express = require("express");
const router = express.Router();
const sejarahController = require("../controllers/sejarahController");
const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/sejarahValidation");

router.post("/", validate(createSchema), sejarahController.upsert);
router.get("/", sejarahController.findData);
router.delete("/:id", sejarahController.delete);

module.exports = router;
