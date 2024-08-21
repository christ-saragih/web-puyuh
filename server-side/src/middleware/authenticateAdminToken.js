const jwt = require("jsonwebtoken");
const blacklist = new Set();
const authenticateAdminToken = (req, res, next) => {
    const token = req.cookies.accessToken || req.header("Authorization");
    // const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }

    const cleanToken = token.replace("Bearer ", "");

    if (blacklist.has(cleanToken)) {
        return res.status(403).json({ message: "Token has been blacklisted." });
    }

    jwt.verify(cleanToken, process.env.ACCESS_SECRET_KEY, (err, admin) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ message: "Invalid token." });
        }

        req.admin = admin;
        next();
    });
};

const logoutAdmin = (req, res) => {
    const token = req.cookies.accessToken || req.header("Authorization");
    if (token) {
        const cleanToken = token.replace("Bearer ", "");
        blacklist.add(cleanToken);
    }
    res.clearCookie("accessToken");
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to logout." });
        }
        res.json({ message: "Logout successful" });
    });
};

module.exports = { authenticateAdminToken, logoutAdmin };
