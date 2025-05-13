import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747103206867 implements MigrationInterface {
    name = 'Init1747103206867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shortened_url" ("id" SERIAL NOT NULL, "url" character varying(255) NOT NULL, "shortened_code" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_299c8304aeeec229267c7dfc194" UNIQUE ("url"), CONSTRAINT "UQ_5c040ea2df5b73ac3aee3a48173" UNIQUE ("shortened_code"), CONSTRAINT "PK_786934fb957b601fcf913b24f04" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shortened_url"`);
    }

}
