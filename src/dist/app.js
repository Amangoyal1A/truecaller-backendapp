"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const spam_routes_1 = __importDefault(require("./routes/spam.routes"));
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use("/api/auth", auth_routes_1.default);
exports.app.use("/api/contacts", contact_routes_1.default);
exports.app.use("/api/search", search_routes_1.default);
exports.app.use("/api/spam", spam_routes_1.default);
//# sourceMappingURL=app.js.map