const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const authAdminController = require("../controllers/authAdminController");

const {
    registrasiSchema,
    loginSchema,
} = require("../validators/authAdminValidation");

const {
    authenticateToken,
    logout,
} = require("../middleware/authenticateToken");

router.post("/create", validate(registrasiSchema), authAdminController.create);

router.post("/login", validate(loginSchema), authAdminController.login);

router.post(
    "/ubahPassword",
    authenticateToken("admin"),
    authAdminController.ubahPassword
);

// Protected route
router.get(
    "/protected",
    authenticateToken("admin"),
    authAdminController.protected
);

router.post(
    "/refresh-token",
    // authenticateToken("admin"),
    authAdminController.refreshToken
);

router.post("/logout", logout);

module.exports = router;
