const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const authInvestorController = require("../controllers/authInvestorController");
const authenticateToken = require("../middleware/authenticateToken");

const { verifyRefreshToken } = require("../middleware/verifyRefreshToken");

const {
    registrasiSchema,
    loginSchema,
} = require("../validators/authInvestorValidation");

router.post(
    "/regis",
    validate(registrasiSchema),
    authInvestorController.register
);
router.post("/login", validate(loginSchema), authInvestorController.login);
router.post("/logout", authInvestorController.logout);
router.get("/protected", authenticateToken, authInvestorController.protected);
router.post(
    "/refresh-token",
    verifyRefreshToken,
    authInvestorController.refreshToken
);
// router.get("/:id", authInvestorController.getOne);
// router.delete("/:id", authInvestorController.delete);

module.exports = router;
