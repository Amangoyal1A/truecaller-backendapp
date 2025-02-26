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
exports.SequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../appConfig/config");
const contact_model_1 = require("../models/contact.model");
const user_model_1 = require("../models/user.model");
const spam_model_1 = require("../models/spam.model");
class SequelizeConnection {
    constructor() {
        SequelizeConnection.instance = new sequelize_1.Sequelize(config_1.appConfig.POSTGRES_DBNAME, config_1.appConfig.POSTGRES_USERNAME, config_1.appConfig.POSTGRES_PASSWORD, {
            host: config_1.appConfig.POSTGRES_HOST,
            port: 5432,
            dialect: "postgres",
            pool: {
                max: 25, //considering there are 4 pods running on prod, we want max 100 connections
                min: 0,
                idle: 10000,
                acquire: 60000,
                evict: 10000,
            },
            logging: false,
            logQueryParameters: true,
            define: {
                timestamps: false,
            },
            retry: {
                max: 5,
                backoffBase: 1000, // Initial backoff duration in ms. For example, 1000 ms
                backoffExponent: 1.5, // Exponential backoff factor
                match: [
                    /ETIMEDOUT/,
                    /EHOSTUNREACH/,
                    /ECONNREFUSED/,
                    /ECONNRESET/,
                    /ENOTFOUND/,
                    /SequelizeConnectionError/,
                    /SequelizeConnectionRefusedError/,
                    /SequelizeHostNotFoundError/,
                    /SequelizeHostNotReachableError/,
                    /SequelizeInvalidConnectionError/,
                    /SequelizeConnectionTimedOutError/,
                ],
                report: (message, obj, err) => {
                    if (err) {
                        console.log(`Error in connecting postgres db retrying. Attempt: ${obj.$current}`, { err });
                    }
                },
            },
        });
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                new SequelizeConnection();
                yield SequelizeConnection.instance.authenticate();
                console.log("Postgres Connected 🐘 via Sequelize");
                //calls init function for all models
                SequelizeConnection.initModels();
                yield SequelizeConnection.instance.sync();
                console.log("All Db models synced successfully");
            }
            catch (error) {
                console.error("Exception in connecting to postgres db", {
                    err: error,
                });
                throw new Error("Error in connecting to postgres db");
            }
        });
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!SequelizeConnection.instance) {
                yield SequelizeConnection.connect();
            }
            return SequelizeConnection.instance;
        });
    }
    static closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (SequelizeConnection.instance) {
                    yield SequelizeConnection.instance.close();
                }
                console.log("PostgresDb disconnected");
                process.exit(1);
                return;
            }
            catch (error) {
                console.log("Error in closing sequelize connection", {
                    err: error,
                });
                return;
            }
        });
    }
    static initModels() {
        try {
            contact_model_1.Contact.initModel(SequelizeConnection.instance);
            user_model_1.User.initModel(SequelizeConnection.instance);
            spam_model_1.Spam.initModel(SequelizeConnection.instance);
        }
        catch (error) {
            console.error("Error in initModels", {
                err: error,
            });
            throw error;
        }
    }
}
exports.SequelizeConnection = SequelizeConnection;
//# sourceMappingURL=sequelizeConnection.js.map