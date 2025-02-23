import dotenv from "dotenv";
dotenv.config();

export const appConfig = {
    POSTGRES_DBNAME: process.env.POSTGRES_DBNAME || "postgres",
    POSTGRES_USERNAME: process.env.POSTGRES_USERNAME || "postgres",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ||"postgres",
    POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
    SAMPLE_SECRET_JWT_KET: process.env.SAMPLE_SECRET_JWT_KET || "865955bd-7b4c-4f30-acbf-e7f62833fe10",
};
