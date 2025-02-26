"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "string.empty": "name is required.",
        "any.required": "name is a required field."
    }),
    phoneNumber: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        "string.empty": "phoneNumber is required.",
        "string.pattern.base": "phoneNumber must be a 10-digit number.",
        "any.required": "phoneNumber number is a required field."
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": "email is required.",
        "string.email": "email must be a valid email address.",
        "any.required": "email is a required field."
    }),
    password: joi_1.default.string().min(5).required().messages({
        "string.empty": "password is required.",
        "string.min": "password must be at least 5 characters long.",
        "any.required": "password is a required field."
    })
});
const validateRegisterRequest = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};
exports.validateRegisterRequest = validateRegisterRequest;
//# sourceMappingURL=register.validation.middleware.js.map