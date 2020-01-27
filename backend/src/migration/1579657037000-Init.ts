import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1579657037000 implements MigrationInterface {
    // prettier-ignore
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
        await queryRunner.query("CREATE TABLE \"note\" (\"id\" uuid NOT NULL DEFAULT gen_random_uuid(), \"note\" text NOT NULL, \"created\" TIMESTAMP NOT NULL DEFAULT now(), \"customerId\" uuid, CONSTRAINT \"PK_96d0c172a4fba276b1bbed43058\" PRIMARY KEY (\"id\"))", undefined);
        await queryRunner.query("CREATE TABLE \"customer\" (\"id\" uuid NOT NULL DEFAULT gen_random_uuid(), \"firstName\" character varying(256) NOT NULL, \"lastName\" character varying(256) NOT NULL, \"status\" character varying(256) NOT NULL, \"phone\" character varying(256) NOT NULL, \"address\" character varying(512) NOT NULL, \"created\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_a7a13f4cacb744524e44dfdad32\" PRIMARY KEY (\"id\"))", undefined);
        await queryRunner.query("ALTER TABLE \"note\" ADD CONSTRAINT \"FK_44b966fa1b600ec6ee09a8bb502\" FOREIGN KEY (\"customerId\") REFERENCES \"customer\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);

        await queryRunner.query(`INSERT INTO customer ("firstName", "lastName", status, phone, address) VALUES 
            ('Bob', 'Thomas', 'prospective', '79473983', '8 Custom Street, Auckland 1010'),
            ('Mark', 'Zed', 'current', '7372390', '12 Queen Street, Auckland CBD, Auckland'),
            ('Lily', 'Ming', 'non-active', '53294434', '68 Anzac Avenue, Auckland CBD, Auckland12 qu')`, undefined);
    }

    // prettier-ignore
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE \"note\" DROP CONSTRAINT \"FK_44b966fa1b600ec6ee09a8bb502\"", undefined);
        await queryRunner.query("DROP TABLE \"customer\"", undefined);
        await queryRunner.query("DROP TABLE \"note\"", undefined);
        await queryRunner.query("DROP EXTENSION IF EXISTS pgcrypto");
    }
}
