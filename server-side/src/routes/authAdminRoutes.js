const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const authAdminController = require("../controllers/authAdminController");
const authenticateToken = require("../middleware/authenticateToken");

const { verifyRefreshToken } = require("../middleware/verifyRefreshToken");

const {
    registrasiSchema,
    loginSchema,
} = require("../validators/authAdminValidation");

router.post("/regis", validate(registrasiSchema), authAdminController.register);
router.post("/login", validate(loginSchema), authAdminController.login);
router.post("/logout", authAdminController.logout);
router.get("/protected", authenticateToken, authAdminController.protected);
router.post(
    "/refresh-token",
    verifyRefreshToken,
    authAdminController.refreshToken
);

module.exports = router;
