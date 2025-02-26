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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByPhoneNumber = exports.searchByName = void 0;
const user_model_1 = require("../models/user.model");
const contact_model_1 = require("../models/contact.model");
const sequelize_1 = require("sequelize");
const searchByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const users = yield user_model_1.User.findAll({
            where: { name: { [sequelize_1.Op.like]: `${name}%` } },
            attributes: ["id", "name", "phoneNumber"],
        });
        const contacts = yield contact_model_1.Contact.findAll({
            where: { name: { [sequelize_1.Op.like]: `%${name}%` } },
            attributes: ["id", "name", "phoneNumber"],
        });
        const combinedResults = [...users, ...contacts];
        return res.json(combinedResults);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.searchByName = searchByName;
const searchByPhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.query;
    if (typeof phoneNumber !== 'string') {
        return res.status(400).json({ error: 'Invalid phone number' });
    }
    try {
        const contacts = yield contact_model_1.Contact.findAll({
            where: { phoneNumber },
            attributes: ["id", "name", "phoneNumber"],
        });
        let combinedResults = [...contacts];
        // If no exact match, fallback to partial match
        if (combinedResults.length === 0) {
            const partialContacts = yield contact_model_1.Contact.findAll({
                where: { phoneNumber: { [sequelize_1.Op.like]: `%${phoneNumber}%` } },
                attributes: ["id", "name", "phoneNumber"],
            });
            combinedResults = [...partialContacts];
        }
        return res.json(combinedResults);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.searchByPhoneNumber = searchByPhoneNumber;
//# sourceMappingURL=search.controller.js.map