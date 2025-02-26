"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_controller_1 = require("../controllers/search.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get("/name", auth_middleware_1.authenticate, search_controller_1.searchByName);
router.get("/phone", auth_middleware_1.authenticate, search_controller_1.searchByPhoneNumber);
exports.default = router;
//# sourceMappingURL=search.routes.js.map