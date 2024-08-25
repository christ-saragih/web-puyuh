const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const authAdminController = require("../controllers/authAdminController");
const {
    authenticateAdminToken,
    logoutAdmin,
} = require("../middleware/authenticateAdminToken");

const { verifyRefreshToken } = require("../middleware/verifyRefreshToken");

const {
    registrasiSchema,
    loginSchema,
} = require("../validators/authAdminValidation");
const authorizeRole = require("../middleware/authorizeRole");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/create", validate(registrasiSchema), authAdminController.create);
router.post("/regis", validate(registrasiSchema), authAdminController.register);
router.post("/login", validate(loginSchema), authAdminController.login);
router.post(
    "/ubahPassword",
    authenticateToken("admin"),
    authAdminController.ubahPassword
);
router.post("/logout", logoutAdmin);
// Protected route
router.get(
    "/protected",
    authenticateToken("admin"),
    // authorizeRole("admin"),
    (req, res) => {
        res.json({ message: "This is a protected route", user: req.user });
    }
);

// router.get("/protected", authenticateToken, authAdminController.protected);
router.post(
    "/refresh-token",
    verifyRefreshToken,
    authAdminController.refreshToken
);

module.exports = router;
