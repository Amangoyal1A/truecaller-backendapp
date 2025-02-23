import { Request, Response } from "express";
import { Spam } from "../models/spam.model";

const markAsSpam = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  try {
    const existingSpam = await Spam.findOne({ where: { phoneNumber } });

    if (existingSpam) {
      await existingSpam.update({ spamCount: existingSpam?.dataValues?.spamCount + 1 });
      res.json({ message: "Spam count updated" });
    } else {
      await Spam.create({ phoneNumber });
      res.status(200).json({ message: "Number marked as spam" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { markAsSpam };
