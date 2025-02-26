"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDummyData = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const contact_model_1 = require("../models/contact.model");
const user_model_1 = require("../models/user.model");
const populateDummyData = () => __awaiter(void 0, void 0, void 0, function* () {
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
        user.password = yield bcryptjs_1.default.hash(user.password, 10);
        yield user_model_1.User.create(user);
    }
    for (const contact of contacts) {
        yield contact_model_1.Contact.create(contact);
    }
    console.log("📊 DUMMY DATA INSERTED SUCCESSFULLY 📊");
});
exports.populateDummyData = populateDummyData;
//# sourceMappingURL=dummyData.js.map