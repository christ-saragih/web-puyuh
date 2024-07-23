const { Investor, InvestorBiodata } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
                message: "Username or email already in use",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat akun investor
        const investor = await Investor.create({
            username,
            email,
            password: hashedPassword,
        });

        // Tambah biodata investor
        await InvestorBiodata.create({
            investorId: investor.id,
            nama_lengkap: investor.username,
            kategori_investor,
            // other fields
        });

        res.status(201).json({
            message: "Registration successful",
            data: investor,
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
                .json({ message: "Invalid username/email or password" });
        }

        const validPassword = await bcrypt.compare(password, investor.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({ message: "Invalid username/email or password" });
        }

        const accessToken = jwt.sign(
            { username: investor.username, email: investor.email },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15m" } // Access token valid for 15 minutes
        );

        const refreshToken = jwt.sign(
            { username: investor.username, email: investor.email },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: "7d" } // Refresh token valid for 7 days
        );

        investor.refresh_token = refreshToken;
        await investor.save();

        // Simpan token dalam session dan cookie
        req.session.investor = investor;
        res.cookie("token", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        res.json({ message: "Login successful", accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie("token");
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
            { username: investor.username, email: investor.email },
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
