"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Authorization token required" });
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req["userId"] = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map