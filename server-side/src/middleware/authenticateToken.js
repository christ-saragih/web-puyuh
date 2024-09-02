const jwt = require("jsonwebtoken");
const { Investor } = require("../models"); // Pastikan model Investor diimpor dengan benar
const blacklist = new Set();

const authenticateToken = (role) => {
    return (req, res, next) => {
        const token = req.header("Authorization");

        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied. No token provided." });
        }

        const cleanToken = token.replace("Bearer ", "");

        if (blacklist.has(cleanToken)) {
            return res
                .status(403)
                .json({ message: "Token has been blacklisted." });
        }

        jwt.verify(cleanToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
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
        // Cek apakah ada token di header Authorization
        const token = req.header("Authorization");

        if (!token) {
            return res
                .status(400)
                .json({ message: "Token tidak ada / Anda belum login!" });
        }

        // Membersihkan token dari prefix "Bearer "
        const cleanToken = token.replace("Bearer ", "");

        // Verifikasi token
        jwt.verify(
            cleanToken,
            process.env.ACCESS_SECRET_KEY,
            async (err, user) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: "Token tidak valid." });
                }

                // Cari investor berdasarkan ID yang di-encode dalam token
                const investor = await Investor.findOne({
                    where: { id: user.id }, // Sesuaikan dengan struktur token JWT Anda
                });

                if (!investor) {
                    return res.status(400).json({
                        message: "Investor tidak ditemukan atau sudah logout.",
                    });
                }

                // Hapus refresh token dari database
                investor.refresh_token = null;
                await investor.save();

                // Tambahkan token ke dalam blacklist
                blacklist.add(cleanToken);

                // Hapus cookie refreshToken jika ada
                res.clearCookie("refreshToken");

                // Kirim respon logout berhasil
                res.status(200).json({ message: "Logout berhasil." });
            }
        );
    } catch (error) {
        // Tangani kesalahan jika terjadi error saat logout
        res.status(500).json({
            message: "Terjadi kesalahan saat logout.",
            error: error.message,
        });
    }
};

// const logout = (req, res) => {
//     const token = req.cookies.token || req.header("Authorization");
//     if (token) {
//         const cleanToken = token.replace("Bearer ", "");
//         blacklist.add(cleanToken);
//     }
//     res.clearCookie("token");
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).json({ message: "Failed to logout." });
//         }
//         res.json({ message: "Logout successful" });
//     });
// };

module.exports = { authenticateToken, logout };
