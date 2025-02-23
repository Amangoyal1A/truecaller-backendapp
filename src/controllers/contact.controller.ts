import { Request, Response } from "express";
import { Contact } from "../models/contact.model";


const getContacts = async (req: Request, res: Response): Promise<any> => {
    try {
        const contacts = await Contact.findAll({ where: { userId: req["userId"] } });
        return res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addContact = async (req: Request, res: Response): Promise<any> => {
    const { name, phoneNumber } = req.body;

    try {
        const contacts = await Contact.findAll({ where: { phoneNumber: phoneNumber, userId: req["userId"] } });
        if (contacts.length > 0) {
            return res.status(400).json({ error: "phone number already exists" });
        }

        const contact = await Contact.create({ name, phoneNumber, userId: req["userId"] });
        return res.status(201).json({ contact });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { getContacts, addContact };
