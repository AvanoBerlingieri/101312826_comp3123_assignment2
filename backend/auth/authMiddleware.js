const jwt = require("jsonwebtoken");

exports.authGuard = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({
            status: false,
            message: "Unauthorized. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send({
            status: false,
            message: "Invalid or expired token"
        });
    }
};
