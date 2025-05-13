import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { dataSourceOptions } from "./typeorm.config";
import { ShortenUrlModule } from "./modules/shorten-url/shorten-url.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: dataSourceOptions,
    }),
    ShortenUrlModule,
  ],
  providers: [],
})
export class AppModule {}
