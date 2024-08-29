const express = require("express");
const router = express.Router();
const investorAlamatController = require("../controllers/investorAlamatController");

const { authenticateToken } = require("../middleware/authenticateToken");

const validate = require("../middleware/validationMiddleware");
const {
    createSchema,
    updateSchema,
} = require("../validators/investorAlamatValidation");

// router.post(
//     "/",
//     authenticateInvestorToken,
//     validate(createSchema),
//     investorAlamatController.create
// );
router.put(
    "/:id",
    authenticateToken("investor"),
    validate(updateSchema),
    investorAlamatController.update
);
router.get("/", investorAlamatController.findAll);
router.get("/:id", investorAlamatController.findOne);
router.delete("/:id", investorAlamatController.delete);

router.post(
    "/",
    authenticateToken("investor"),
    validate(updateSchema),
    investorAlamatController.upsert
);

module.exports = router;
