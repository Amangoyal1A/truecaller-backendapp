"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spam_controller_1 = require("../controllers/spam.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const spam_validation_middleware_1 = require("../middleware/validation/spam.validation.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticate, spam_validation_middleware_1.validateSpamRequest, spam_controller_1.markAsSpam);
exports.default = router;
//# sourceMappingURL=spam.routes.js.map