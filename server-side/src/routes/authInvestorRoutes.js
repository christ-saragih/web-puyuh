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

router.post(
    "/regis",
    validate(registrasiSchema),
    authInvestorController.register
);
router.post("/login", validate(loginSchema), authInvestorController.login);
router.post("/logout", logoutInvestor);
// Protected route
router.get("/protected", authenticateInvestorToken, (req, res) => {
    res.json({ message: "This is a protected route", investor: req.investor });
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
