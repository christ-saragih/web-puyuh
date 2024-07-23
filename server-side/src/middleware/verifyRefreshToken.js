const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        req.decoded = decoded;
        next();
    });
};

module.exports = {
    verifyRefreshToken,
};
