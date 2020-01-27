import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";
import { ConnectionOptions } from "typeorm";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

export const connectionOpts: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "****",
    database: process.env.DB_NAME || "postgres",
    logging: false,
    uuidExtension: "pgcrypto",
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    migrationsTableName: "migrations",
    migrationsRun: true
};
