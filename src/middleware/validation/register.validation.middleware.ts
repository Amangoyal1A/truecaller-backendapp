import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "name is required.",
        "any.required": "Name is a required field"
    }),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.empty": "phoneNumber is required.",
            "string.pattern.base": "phoneNumber must be a 10-digit number.",
            "any.required": "phoneNumber number is a required field."
        }),

    email: Joi.string().email().required().messages({
        "string.empty": "email is required.",
        "string.email": "email must be a valid email address.",
        "any.required": "email is a required field."
    }),
    password: Joi.string().min(5).required().messages({
        "string.empty": "password is required.",
        "string.min": "password must be at least 5 characters long.",
        "any.required": "password is a required field."
    })
});

export const validateRegisterRequest = (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail: any) => detail.message);
        return res.status(400).json({ errors });
    }

    next();
};

