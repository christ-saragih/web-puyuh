const express = require("express");
const router = express.Router();
const adminBiodataController = require("../controllers/adminBiodataController");
const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/adminBiodataValidation");

const {
    authenticateAdminToken,
} = require("../middleware/authenticateAdminToken");
const authorizeRole = require("../middleware/authorizeRole");

router.post(
    "/",
    authenticateAdminToken,
    authorizeRole("admin"),
    validate(createSchema),
    adminBiodataController.create
);
router.put(
    "/:id",
    authenticateAdminToken,
    validate(updateSchema),
    adminBiodataController.update
);
router.get("/", adminBiodataController.findAll);
router.get("/:id", adminBiodataController.findOne);
router.delete("/:id", adminBiodataController.delete);

module.exports = router;
