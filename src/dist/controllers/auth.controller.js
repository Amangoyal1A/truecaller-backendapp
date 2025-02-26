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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("../models/user.model");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_model_1.User.create({ name, phoneNumber, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    try {
        const user = yield user_model_1.User.findOne({ where: { phoneNumber } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.dataValues.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = (0, jwt_1.generateToken)(user.dataValues.id);
        res.json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map