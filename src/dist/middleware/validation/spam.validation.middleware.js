"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSpamRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    phoneNumber: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
        "string.empty": "phoneNumber is required.",
        "string.pattern.base": "phoneNumber must be a 10-digit number.",
        "any.required": "phoneNumber number is a required field."
    }),
});
const validateSpamRequest = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }
    next();
};
exports.validateSpamRequest = validateSpamRequest;
//# sourceMappingURL=spam.validation.middleware.js.map