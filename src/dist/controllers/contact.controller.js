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
exports.addContact = exports.getContacts = void 0;
const contact_model_1 = require("../models/contact.model");
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contact_model_1.Contact.findAll({ where: { userId: req["userId"] } });
        return res.status(200).json({ contacts });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getContacts = getContacts;
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber } = req.body;
    try {
        const contacts = yield contact_model_1.Contact.findAll({ where: { phoneNumber: phoneNumber, userId: req["userId"] } });
        if (contacts.length > 0) {
            return res.status(400).json({ error: "phone number already exists" });
        }
        const contact = yield contact_model_1.Contact.create({ name, phoneNumber, userId: req["userId"] });
        return res.status(201).json({ contact });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addContact = addContact;
//# sourceMappingURL=contact.controller.js.map