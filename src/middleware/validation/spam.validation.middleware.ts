import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            "string.empty": "phoneNumber is required.",
            "string.pattern.base": "phoneNumber must be a 10-digit number.",
            "any.required": "phoneNumber number is a required field."
        }),
});

export const validateSpamRequest = (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail: any) => detail.message);
        return res.status(400).json({ errors });
    }

    next();
};

