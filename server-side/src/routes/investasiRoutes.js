const express = require("express");
const router = express.Router();
const investasiController = require("../controllers/investasiController");
const validate = require("../middleware/validationMiddleware");

const {
    createSchema,
    updateSchema,
} = require("../validators/investasiValidation");

const {
    authenticateAdminToken,
} = require("../middleware/authenticateAdminToken");
const authorizeRole = require("../middleware/authorizeRole");

router.post(
    "/",
    authenticateAdminToken,
    authorizeRole("admin"),
    validate(createSchema),
    investasiController.create
);
router.put(
    "/:id",
    authenticateAdminToken,
    authorizeRole("admin"),
    validate(updateSchema),
    investasiController.update
);
router.get("/", investasiController.findAll);
router.get("/:id", investasiController.findOne);
router.delete("/:id", investasiController.delete);

module.exports = router;
