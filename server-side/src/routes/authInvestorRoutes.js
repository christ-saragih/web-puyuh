const express = require("express");
const router = express.Router();
const authInvestorController = require("../controllers/authInvestorController");
const validate = require("../middleware/validationMiddleware");
const {
    authenticateInvestorToken,
    logoutInvestor,
} = require("../middleware/authenticateInvestorToken");

const { verifyRefreshToken } = require("../middleware/verifyRefreshToken");

const {
    registrasiSchema,
    loginSchema,
} = require("../validators/authInvestorValidation");
const { authenticateToken } = require("../middleware/authenticateToken");

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
router.post("/logout", logoutInvestor);
// Protected route
router.get("/protected", authenticateToken("investor"), (req, res) => {
    res.json({ message: "This is a protected route", user: req.investor });
});

// router.get("/protected", authenticateToken, authInvestorController.protected);
router.post(
    "/refresh-token",
    verifyRefreshToken,
    authInvestorController.refreshToken
);
// router.get("/:id", authInvestorController.getOne);
// router.delete("/:id", authInvestorController.delete);

module.exports = router;
