import { join } from "node:path";
import { ConfigService } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export function dataSourceOptions(
  configService: ConfigService,
): PostgresConnectionOptions {
  const env = configService.get<string>("NODE_ENV");
  return {
    migrationsTableName: "migrations",
    type: "postgres",
    host: configService.getOrThrow("DB_HOST"),
    port: +configService.getOrThrow("DB_PORT"),
    username: configService.getOrThrow("DB_USERNAME"),
    password: configService.getOrThrow("DB_PASSWORD"),
    database: configService.getOrThrow("DB_DATABASE"),
    schema: configService.get("DB_SCHEMA"),
    ssl: env === "production" ? { rejectUnauthorized: false } : undefined,
    entities: [join(__dirname, "modules", "**", "*", "entities", "*.entity.*")],
    migrations: [join(__dirname, "migrations", "*")],
    migrationsRun: env === "production",
  };
}
