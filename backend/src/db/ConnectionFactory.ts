import { createConnection, Connection, Repository, ObjectType } from "typeorm";
import logger from "../util/logger";
import { connectionOpts } from "../util/secrets";

export class ConnectionFactory {
    private static connection: Connection;

    public static init() {
        if (this.connection) {
            logger.info("Reuse existing DB connection.");
            return;
        }
        createConnection(connectionOpts).then(
            (connection) => {
                this.connection = connection;
                logger.info("A new DB connection is created.");
            },
            (error) => {
                logger.error("Failed to connect to db: ", error);
                process.exit(1);
            }
        );
    }

    public static getConnection() {
        return ConnectionFactory.connection;
    }
}

export function getRepository<Entity>(entityClass: ObjectType<Entity>): Repository<Entity> {
    return ConnectionFactory.getConnection().getRepository(entityClass);
}
