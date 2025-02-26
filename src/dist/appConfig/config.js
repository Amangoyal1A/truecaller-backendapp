"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.appConfig = {
    POSTGRES_DBNAME: process.env.POSTGRES_DBNAME || "postgres",
    POSTGRES_USERNAME: process.env.POSTGRES_USERNAME || "postgres",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
    POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
    SAMPLE_SECRET_JWT_KET: process.env.SAMPLE_SECRET_JWT_KET || "865955bd-7b4c-4f30-acbf-e7f62833fe10",
};
//# sourceMappingURL=config.js.map