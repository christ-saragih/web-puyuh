// middleware/sessionMiddleware.js
module.exports = (req, res, next) => {
    if (req.url.startsWith("/investor")) {
        req.sessionType = "investor";
    } else if (req.url.startsWith("/admin")) {
        req.sessionType = "admin";
    }
    next();
};
