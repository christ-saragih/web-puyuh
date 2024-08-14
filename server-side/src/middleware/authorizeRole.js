const jwt = require("jsonwebtoken");

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.cookies.accessToken || req.header("Authorization");
        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied. No token provided." });
        }

        const cleanToken = token.replace("Bearer ", "");
        jwt.verify(cleanToken, process.env.ACCESS_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token." });
            }

            if (user.role !== requiredRole) {
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

module.exports = authorizeRole;
