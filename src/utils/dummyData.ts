import bcrypt from "bcryptjs";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";

export const populateDummyData = async () => {
    const users = [
        { name: "Aarav Sharma", phoneNumber: "9876543210", email: "aarav.sharma@example.com", password: "password123" },
        { name: "Isha Patel", phoneNumber: "8765432109", email: "isha.patel@example.com", password: "password123" },
        { name: "Rohan Gupta", phoneNumber: "7654321098", email: "rohan.gupta@example.com", password: "password123" },
        { name: "Meera Nair", phoneNumber: "6543210987", email: "meera.nair@example.com", password: "password123" },
        { name: "Karan Singh", phoneNumber: "5432109876", email: "karan.singh@example.com", password: "password123" },
    ];

    const contacts = [
        { name: "Aditya Verma", phoneNumber: "9876543211", userId: 1 },
        { name: "Anjali Desai", phoneNumber: "8765432101", userId: 1 },
        { name: "Priya Mehta", phoneNumber: "7654321012", userId: 2 },
        { name: "Ravi Joshi", phoneNumber: "6543210123", userId: 2 },
        { name: "Sneha Kapoor", phoneNumber: "5432101234", userId: 3 },
    ];

    for (const user of users) {
        user.password = await bcrypt.hash(user.password, 10);
        await User.create(user);
    }

    for (const contact of contacts) {
        await Contact.create(contact);
    }

    console.log("📊 DUMMY DATA INSERTED SUCCESSFULLY 📊")
};

