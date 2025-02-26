"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("../controllers/contact.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const contact_validation_middleware_1 = require("../middleware/validation/contact.validation.middleware");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.authenticate, contact_controller_1.getContacts);
router.post("/", auth_middleware_1.authenticate, contact_validation_middleware_1.validateContactRequest, contact_controller_1.addContact);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map