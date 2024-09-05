const express = require("express");
const router = express.Router();
const authInvestorController = require("../controllers/authInvestorController");
const validate = require("../middleware/validationMiddleware");

const {
    registrasiSchema,
    loginSchema,
} = require("../validators/authInvestorValidation");

const {
    authenticateToken,
    logout,
} = require("../middleware/authenticateToken");

router.post(
    "/regis",
    validate(registrasiSchema),
    authInvestorController.register
);
router.get("/verify-email", authInvestorController.verifyEmail);
router.post(
    "/request-verification",
    authInvestorController.requestVerification
);
router.post("/reset-password", authInvestorController.resetPassword);
router.post(
    "/request-password-reset",
    authInvestorController.requestPasswordReset
);
router.post("/login", validate(loginSchema), authInvestorController.login);
router.post("/logout", authenticateToken("investor"), logout);

router.post(
    "/refresh-token",
    // authenticateToken("investor"),
    authInvestorController.refreshToken
);

// Protected route
router.get(
    "/protected",
    authenticateToken("investor"),
    authInvestorController.protected
);

module.exports = router;
