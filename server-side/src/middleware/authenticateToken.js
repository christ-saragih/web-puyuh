const jwt = require("jsonwebtoken");
const { Investor } = require("../models");
const blacklist = new Set();
require("dotenv").config();

const authenticateToken = (role) => {
    return (req, res, next) => {
        const token = req.cookies.accessToken;

        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied. No token provided." });
        }

        if (blacklist.has(token)) {
            return res
                .status(403)
                .json({ message: "Token has been blacklisted." });
        }

        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(403).json({ message: "Invalid token." });
            }

            if (user.role !== role) {
                return res.status(403).json({
                    message:
                        "Access denied. You do not have the required role.",
                });
            }

            req.user = user;
            next();
        });
    };
};

const logout = async (req, res) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res
                .status(400)
                .json({ message: "Token tidak ada / Anda belum login!" });
        }

        jwt.verify(token, process.env.ACCESS_SECRET_KEY, async (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Token tidak valid." });
            }

            const investor = await Investor.findOne({
                where: { id: user.id },
            });

            if (!investor) {
                return res.status(400).json({
                    message: "Investor tidak ditemukan atau sudah logout.",
                });
            }

            investor.refresh_token = null;
            await investor.save();

            blacklist.add(token);

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            res.status(200).json({ message: "Logout berhasil." });
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat logout.",
            error: error.message,
        });
    }
};
module.exports = { authenticateToken, logout };
