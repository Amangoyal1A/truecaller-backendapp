import { Sequelize } from "sequelize";
import { appConfig } from "../appConfig/config";
import { Contact } from "../models/contact.model";
import { User } from "../models/user.model";
import { Spam } from "../models/spam.model";


export class SequelizeConnection {
    private static instance: Sequelize;

    private constructor() {
        SequelizeConnection.instance = new Sequelize(
            appConfig.POSTGRES_DBNAME,
            appConfig.POSTGRES_USERNAME,
            appConfig.POSTGRES_PASSWORD,
            {
                host: appConfig.POSTGRES_HOST,
                port:  5432, 
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
                            console.log(
                                `Error in connecting postgres db retrying. Attempt: ${obj.$current}`,
                                { err }
                            );
                        }
                    },
                },
            }
        );
    }
    private static async connect(): Promise<void> {
        try {
            new SequelizeConnection();

            await SequelizeConnection.instance.authenticate();

            console.log("Postgres Connected 🐘 via Sequelize");

            //calls init function for all models
            SequelizeConnection.initModels();

            await SequelizeConnection.instance.sync();

            console.log("All Db models synced successfully");
        } catch (error) {
            console.error("Exception in connecting to postgres db", {
                err: error,
            });
            throw new Error("Error in connecting to postgres db");
        }
    }
    public static async getInstance(): Promise<Sequelize> {
        if (!SequelizeConnection.instance) {
            await SequelizeConnection.connect();
        }
        return SequelizeConnection.instance;
    }

    public static async closeConnection(): Promise<void> {
        try {
            if (SequelizeConnection.instance) {
                await SequelizeConnection.instance.close();
            }
            console.log("PostgresDb disconnected");
            process.exit(1);
            return;
        } catch (error) {
            console.log("Error in closing sequelize connection", {
                err: error,
            });
            return;
        }
    }

    public static initModels() {
        try {
            Contact.initModel(SequelizeConnection.instance);
            User.initModel(SequelizeConnection.instance);
            Spam.initModel(SequelizeConnection.instance);
        } catch (error) {
            console.error("Error in initModels", {
                err: error,
            });
            throw error;
        }
    }
}
