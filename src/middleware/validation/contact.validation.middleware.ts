import { NextFunction, Request, Response } from "express";

import Joi from "joi";

// Define validation schema for phoneNumber and password
const schema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name is required.",
        "any.required": "Name is a required field"
    }),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required.",
            "string.pattern.base": "Phone number must be a 10-digit number.",
            "any.required": "phoneNumber is a required field"
        }),
});


export const validateContactRequest = (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }

    next();
};

