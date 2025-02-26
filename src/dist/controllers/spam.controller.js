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
exports.markAsSpam = void 0;
const spam_model_1 = require("../models/spam.model");
const markAsSpam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { phoneNumber } = req.body;
    try {
        const existingSpam = yield spam_model_1.Spam.findOne({ where: { phoneNumber } });
        if (existingSpam) {
            yield existingSpam.update({ spamCount: ((_a = existingSpam === null || existingSpam === void 0 ? void 0 : existingSpam.dataValues) === null || _a === void 0 ? void 0 : _a.spamCount) + 1 });
            res.json({ message: "Spam count updated" });
        }
        else {
            yield spam_model_1.Spam.create({ phoneNumber });
            res.status(200).json({ message: "Number marked as spam" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.markAsSpam = markAsSpam;
//# sourceMappingURL=spam.controller.js.map