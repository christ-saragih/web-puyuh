const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// Register
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Cek apakah username atau email sudah digunakan
        const existingUser = await Admin.findOne({
            where: {
                [Op.or]: [{ username: username }, { email: email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username atau Email sudah digunakan!",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat akun admin
        const admin = await Admin.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Registrasi Berhasil!",
            data: admin,
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "Username or email already in use",
                error: error.errors.map((e) => e.message),
            });
        }
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

        const admin = await Admin.findOne({
            where: {
                [Op.or]: [
                    { email: usernameOrEmail },
                    { username: usernameOrEmail },
                ],
            },
        });

        if (!admin) {
            return res
                .status(400)
                .json({ message: "Kesalahan Username/Email atau Password!" });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({ message: "Kesalahan Username/Email atau Password!" });
        }

        const accessToken = jwt.sign(
            {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: "admin",
            },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15m" } // Access token valid for 15 minutes
        );

        const refreshToken = jwt.sign(
            {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                role: "admin",
            },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: "7d" } // Refresh token valid for 7 days
        );

        admin.refresh_token = refreshToken;
        await admin.save();

        // Simpan token dalam session dan cookie
        req.session.admin = admin;
        res.cookie("token", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        res.json({ message: "Login successful", accessToken, refreshToken });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                message: "Validation error",
                error: error.errors.map((e) => e.message),
            });
        }
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to logout." });
        }
        res.json({ message: "Logout successful" });
    });
};
// Protected route example
exports.protected = (req, res) => {
    res.json({ message: "This is a protected route", username: req.username });
};

// Refresh token endpoint
exports.refreshToken = async (req, res) => {
    try {
        const { username, email } = req.decoded;

        const admin = await Admin.findOne({
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

        if (!admin) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
            { username: admin.username, email: admin.email, role: "admin" },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15m" }
        );

        res.cookie("token", newAccessToken, { httpOnly: true });
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
