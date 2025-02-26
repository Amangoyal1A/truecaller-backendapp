"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContactRequest = void 0;
const joi_1 = __importDefault(require("joi"));
// Define validation schema for phoneNumber and password
const schema = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "string.empty": "Name is required.",
        "any.required": "name is a required field."
    }),
    phoneNumber: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        "string.empty": "Phone number is required.",
        "string.pattern.base": "Phone number must be a 10-digit number.",
        "any.required": "phoneNumber is a required field."
    }),
});
const validateContactRequest = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};
exports.validateContactRequest = validateContactRequest;
//# sourceMappingURL=contact.validation.middleware.js.map