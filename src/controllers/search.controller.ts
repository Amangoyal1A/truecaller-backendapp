import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Contact } from "../models/contact.model";
import { Op } from "sequelize";

const searchByName = async (req: Request, res: Response): Promise<any> => {
    const { name } = req.query;

    try {
        const users = await User.findAll({
            where: { name: { [Op.like]: `${name}%` } },
            attributes: ["id", "name", "phoneNumber"],
        });

        const contacts = await Contact.findAll({
            where: { name: { [Op.like]: `%${name}%` } },
            attributes: ["id", "name", "phoneNumber"],
        });

        const combinedResults = [...users, ...contacts];
        return res.json(combinedResults);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const searchByPhoneNumber = async (req: Request, res: Response): Promise<any> => {
    const { phoneNumber } = req.query;

    if (typeof phoneNumber !== 'string') {
        return res.status(400).json({ error: 'Invalid phone number' });
    }

    try {

        const contacts = await Contact.findAll({
            where: { phoneNumber },
            attributes: ["id", "name", "phoneNumber"],
        });

        let combinedResults = [...contacts];

        // If no exact match, fallback to partial match
        if (combinedResults.length === 0) {
            const partialContacts = await Contact.findAll({
                where: { phoneNumber: { [Op.like]: `%${phoneNumber}%` } },
                attributes: ["id", "name", "phoneNumber"],
            });

            combinedResults = [...partialContacts];
        }

        return res.json(combinedResults);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export { searchByName, searchByPhoneNumber };
