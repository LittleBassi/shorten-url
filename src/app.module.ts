import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { dataSourceOptions } from "./typeorm.config";
import { ShortenUrlModule } from "./modules/shorten-url/shorten-url.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: dataSourceOptions,
    }),
    AuthModule,
    ShortenUrlModule,
    UsersModule,
  ],
  providers: [
    {
      provide: "APP_GUARD",
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
