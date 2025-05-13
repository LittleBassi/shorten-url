import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShortenedUrl } from "./entities/shortened-url.entity";
import { ShortenUrlController } from "./shorten-url.controller";
import { ShortenUrlService } from "./shorten-url.service";
import { ShortenUrlRepository } from "./shorten-url.repository";
import { ConfigService } from "@nestjs/config";
import { UsersModule } from "../users/users.module";
import { RedirectUrlController } from "./redirect-url.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ShortenedUrl]), UsersModule],
  controllers: [ShortenUrlController, RedirectUrlController],
  providers: [
    ShortenUrlService,
    ShortenUrlRepository,
    {
      provide: "API_ROUTE",
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow("API_ROUTE"),
    },
  ],
  exports: [ShortenUrlService],
})
export class ShortenUrlModule {}
