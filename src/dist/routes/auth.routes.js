"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const register_validation_middleware_1 = require("../middleware/validation/register.validation.middleware");
const login_validation_middleware_1 = require("../middleware/validation/login.validation.middleware");
const router = express_1.default.Router();
router.post("/register", register_validation_middleware_1.validateRegisterRequest, auth_controller_1.register);
router.post("/login", login_validation_middleware_1.validateLoginRequest, auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map