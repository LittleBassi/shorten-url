import { MigrationInterface, QueryRunner } from "typeorm";

export class RedirectUrl1747167457419 implements MigrationInterface {
    name = 'RedirectUrl1747167457419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortened_url" ADD "redirect_url" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortened_url" DROP COLUMN "redirect_url"`);
    }

}
