import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1747152349072 implements MigrationInterface {
  name = "Users1747152349072";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ADD "user_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ADD CONSTRAINT "FK_9d84c9540a58fd86847f9c1cf8f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" DROP CONSTRAINT "FK_9d84c9540a58fd86847f9c1cf8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortened_url" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
