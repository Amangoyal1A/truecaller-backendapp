import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { User } from "../models/user.model";

const register = async (req: Request, res: Response): Promise<any> => {
    const { name, phoneNumber, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, phoneNumber, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req: Request, res: Response): Promise<any> => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ where: { phoneNumber } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user.dataValues.id);

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { register, login };
