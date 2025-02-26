"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginRequest = void 0;
const joi_1 = __importDefault(require("joi"));
// Define validation schema for phoneNumber and password
const schema = joi_1.default.object({
    phoneNumber: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        "string.empty": "phoneNumber is required.",
        "string.pattern.base": "phoneNumber must be a 10-digit number.",
        "any.required": "phoneNumber is a required field."
    }),
    password: joi_1.default.string()
        .min(5)
        .required()
        .messages({
        "string.empty": "password is required.",
        "string.min": "password must be at least 5 characters long.",
        "any.required": "password is a required field."
    })
});
const validateLoginRequest = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};
exports.validateLoginRequest = validateLoginRequest;
//# sourceMappingURL=login.validation.middleware.js.map