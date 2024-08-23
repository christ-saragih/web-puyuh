const { Investor } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
    sendVerificationEmail,
    sendResetPasswordEmail,
} = require("../services/emailService");
const { Op } = require("sequelize");

// Register
exports.register = async (req, res) => {
    const { username, email, password, kategori_investor } = req.body;

    try {
        // Cek apakah username atau email sudah digunakan
        const existingUser = await Investor.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username atau Email Sudah Digunakan!",
            });
        }

        // verificationToken
        const verificationToken = crypto.randomBytes(20).toString("hex");
        const verificationTokenExpiry = new Date(Date.now() + 3600000);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat akun investor
        const investor = await Investor.create({
            username,
            email,
            password: hashedPassword,
            kategori_investor,
            verificationToken,
            verificationTokenExpiry,
        });

        await sendVerificationEmail(email, verificationToken);

        // Tambah biodata investor
        // await InvestorBiodata.create({
        //     investorId: investor.id,
        //     nama_lengkap: investor.username,
        //     kategori_investor,
        // });

        res.status(201).json({
            message: "Registration successful! Please verify your email.",
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "Username atau Email Sudah Digunakan!",
                error: error.errors.map((e) => e.message),
            });
        }
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const investor = await Investor.findOne({
            where: {
                verificationToken: token,
                verificationTokenExpiry: {
                    [Op.gt]: new Date(), // Pastikan token belum kedaluwarsa
                },
            },
        });

        if (!investor) {
            return res.status(400).json({
                message: "Invalid or expired verification token.",
            });
        }

        if (investor.isVerified) {
            return res.status(400).json({
                message: "Account is already verified.",
            });
        }

        investor.isVerified = true;
        investor.verificationToken = null;
        investor.verificationTokenExpiry = null;
        await investor.save();

        res.status(200).json({
            message: "Email successfully verified!",
        });
    } catch (error) {
        console.error("Error during email verification:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.requestVerification = async (req, res) => {
    try {
        const { email } = req.body;

        const investor = await Investor.findOne({ where: { email } });

        if (!investor) {
            return res.status(404).json({ message: "Investor not found." });
        }

        if (investor.isVerified) {
            return res
                .status(400)
                .json({ message: "Account is already verified." });
        }

        // Batasi permintaan verifikasi ulang
        if (
            investor.verificationToken &&
            investor.verificationTokenExpiry > new Date()
        ) {
            return res.status(400).json({
                message: "Verification email already sent. Please wait.",
            });
        }

        const verificationToken = crypto.randomBytes(20).toString("hex");
        const verificationTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

        investor.verificationToken = verificationToken;
        investor.verificationTokenExpiry = verificationTokenExpiry;
        await investor.save();

        await sendVerificationEmail(email, verificationToken);

        res.status(200).json({
            message: "Verification email sent! Please check your inbox.",
        });
    } catch (error) {
        console.error("Error requesting verification:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const investor = await Investor.findOne({
            where: {
                [Op.or]: [
                    { email: usernameOrEmail },
                    { username: usernameOrEmail },
                ],
            },
        });

        if (!investor) {
            return res
                .status(400)
                .json({ message: "username/email atau password salah!" });
        }

        if (!investor.isVerified) {
            return res.status(400).json({
                message:
                    "Akun belum terverifikasi. Silakan verifikasi email Anda.",
            });
        }

        const validPassword = await bcrypt.compare(password, investor.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({ message: "username/email atau password salah!" });
        }

        const accessToken = jwt.sign(
            {
                id: investor.id,
                username: investor.username,
                email: investor.email,
                role: "investor",
                kategori_investor: investor.kategori_investor,
            },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            {
                id: investor.id,
                username: investor.username,
                email: investor.email,
                role: "investor",
                kategori_investor: investor.kategori_investor,
            },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: "1d" }
        );

        investor.refresh_token = refreshToken;
        await investor.save();

        // Simpan token dalam session dan cookie
        req.session.investor = investor;
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        const investor = await Investor.findOne({ where: { email } });

        if (!investor) {
            return res.status(404).json({ message: "Investor not found." });
        }

        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

        investor.resetPasswordToken = resetPasswordToken;
        investor.resetPasswordTokenExpiry = resetPasswordTokenExpiry;
        await investor.save();

        await sendResetPasswordEmail(email, resetPasswordToken);

        res.status(200).json({
            message: "Password reset email sent! Please check your inbox.",
        });
    } catch (error) {
        console.error("Error requesting password reset:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const investor = await Investor.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenExpiry: {
                    [Op.gt]: new Date(),
                },
            },
        });

        if (!investor) {
            return res
                .status(400)
                .json({ message: "Invalid or expired reset token." });
        }

        investor.password = await bcrypt.hash(newPassword, 10);
        investor.resetPasswordToken = null;
        investor.resetPasswordTokenExpiry = null;
        await investor.save();

        res.status(200).json({ message: "Password successfully updated!" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
// Logout
exports.logout = (req, res) => {
    res.clearCookie("accessToken");
    req.session.destroy();
    res.json({ message: "Logout successful" });
};

// Protected route example
exports.protected = (req, res) => {
    res.json({ message: "This is a protected route", username: req.username });
};

// Refresh token endpoint
exports.refreshToken = async (req, res) => {
    try {
        const { username, email } = req.decoded;

        const investor = await Investor.findOne({
            where: {
                [Op.and]: [
                    { username },
                    { email },
                    {
                        refresh_token:
                            req.cookies.refreshToken || req.body.refreshToken,
                    },
                ],
            },
        });

        if (!investor) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
            {
                id: investor.id,
                username: investor.username,
                email: investor.email,
                role: "investor",
                kategori_investor: investor.kategori_investor,
            },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccessToken, { httpOnly: true });
        res.json({
            message: "Access token refreshed",
            accessToken: newAccessToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
