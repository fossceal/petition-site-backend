const jwt = require("jsonwebtoken");
const user = require("../models/user_model");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Please Login for access this resource",
        });
        return;
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await user.findById(decodedData.id);

    next();
};

// Admin Roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            // return next(new ErrorHandler(`${req.user.role} can not access this resources`));
            
            res.status(403).json({
                success: false,
                message: `${req.user.role} can not access this resources`,
            });
            return;
        };
        next();
    }
}