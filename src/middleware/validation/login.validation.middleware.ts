import { NextFunction, Request, Response } from "express";

import Joi from "joi";

// Define validation schema for phoneNumber and password
const schema = Joi.object({
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.empty": "phoneNumber is required.",
            "string.pattern.base": "phoneNumber must be a 10-digit number.",
            "any.required": "phoneNumber is a required field."
        }),
    password: Joi.string()
        .min(5)
        .required()
        .messages({
            "string.empty": "password is required.",
            "string.min": "password must be at least 5 characters long.",
            "any.required": "password is a required field."
        })
});


export const validateLoginRequest = (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors });
    }

    next();
};

