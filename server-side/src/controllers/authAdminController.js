const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op, where } = require("sequelize");
require("dotenv").config();

// Membuat access token
const generateAccessToken = (admin) => {
    return jwt.sign(
        {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: "admin",
        },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
    );
};

// Membuat refresh token
const generateRefreshToken = (admin) => {
    return jwt.sign(
        {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: "admin",
        },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: "1d" }
    );
};

// Create
exports.create = async (req, res) => {
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

        const accessToken = generateAccessToken(admin);
        const refreshToken = generateRefreshToken(admin);

        admin.refresh_token = refreshToken;
        await admin.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login Berhasil", admin, accessToken });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.ubahPassword = async (req, res) => {
    const { password } = req.body;

    try {
        const admin = await Admin.findOne({
            where: {
                [Op.or]: [
                    { username: req.user.username },
                    { email: req.user.email },
                ],
            },
        });

        if (!admin) {
            return res.status(404).json({
                message: "Admin tidak ditemukan",
            });
        }

        const passwordBaru = await bcrypt.hash(password, 10);

        await admin.update({ password: passwordBaru });

        return res.status(200).json({
            message: "Password berhasil diubah",
            data: admin,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan internal",
            error: error.message,
        });
    }
};

// Protected route example
exports.protected = (req, res) => {
    res.json({ message: "This is a protected route", admin: req.user });
};

// Refresh token
exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res
            .status(403)
            .json({ message: "Refresh token tidak disediakan" });
    }

    try {
        const storedToken = await Admin.findOne({
            where: { refresh_token: refreshToken },
            attributes: ["id", "username", "email", "refresh_token"],
        });

        if (!storedToken) {
            return res
                .status(403)
                .json({ message: "Refresh token tidak valid" });
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY,
            async (err, user) => {
                if (err) {
                    console.error("Kesalahan Verifikasi Refresh Token:", err);
                    return res
                        .status(403)
                        .json({ message: "Token tidak valid" });
                }

                const newAccessToken = generateAccessToken({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: "user",
                });

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict",
                    maxAge: 1 * 24 * 60 * 60 * 1000,
                });

                res.status(200).json({ accessToken: newAccessToken });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
