import { MigrationInterface, QueryRunner } from "typeorm";

export class UrlViewCount1747165920502 implements MigrationInterface {
    name = 'UrlViewCount1747165920502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortened_url" ADD "view_count" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortened_url" DROP COLUMN "view_count"`);
    }

}
