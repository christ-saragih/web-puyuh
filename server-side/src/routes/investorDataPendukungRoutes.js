const express = require("express");
const router = express.Router();
const investorDataPendukungController = require("../controllers/investorDataPendukungController");
const {
    authenticateInvestorToken,
} = require("../middleware/authenticateInvestorToken");
const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/investorDataPendukungValidation");

router.post(
    "/",
    authenticateInvestorToken,
    validate(createSchema),
    investorDataPendukungController.create
);
router.put(
    "/:id",
    authenticateInvestorToken,
    validate(updateSchema),
    investorDataPendukungController.update
);
router.get("/", investorDataPendukungController.findAll);
router.get("/:id", investorDataPendukungController.findOne);
router.delete("/:id", investorDataPendukungController.delete);

module.exports = router;
