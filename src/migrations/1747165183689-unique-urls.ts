import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueUrls1747165183689 implements MigrationInterface {
    name = 'UniqueUrls1747165183689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortened_url" DROP CONSTRAINT "UQ_299c8304aeeec229267c7dfc194"`);
        await queryRunner.query(`ALTER TABLE "shortened_url" DROP CONSTRAINT "UQ_5c040ea2df5b73ac3aee3a48173"`);
        await queryRunner.query(`ALTER TABLE "shortened_url" ADD CONSTRAINT "UQ_f1668c865153e74086da77cf155" UNIQUE ("url", "deleted_at")`);
        await queryRunner.query(`ALTER TABLE "shortened_url" ADD CONSTRAINT "UQ_67ad791db044083af32ffdd31ca" UNIQUE ("shortened_code", "deleted_at")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shortened_url" DROP CONSTRAINT "UQ_67ad791db044083af32ffdd31ca"`);
        await queryRunner.query(`ALTER TABLE "shortened_url" DROP CONSTRAINT "UQ_f1668c865153e74086da77cf155"`);
        await queryRunner.query(`ALTER TABLE "shortened_url" ADD CONSTRAINT "UQ_5c040ea2df5b73ac3aee3a48173" UNIQUE ("shortened_code")`);
        await queryRunner.query(`ALTER TABLE "shortened_url" ADD CONSTRAINT "UQ_299c8304aeeec229267c7dfc194" UNIQUE ("url")`);
    }

}
