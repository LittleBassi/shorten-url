import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShortenedUrl } from "./entities/shortened-url.entity";
import { ShortenUrlController } from "./shorten-url.controller";
import { ShortenUrlService } from "./shorten-url.service";
import { ShortenUrlRepository } from "./shorten-url.repository";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([ShortenedUrl])],
  controllers: [ShortenUrlController],
  providers: [ShortenUrlService, ShortenUrlRepository, {
    provide: 'API_ROUTE',
    inject: [ConfigService],
	useFactory: (configService: ConfigService) => configService.getOrThrow('API_ROUTE')
  }],
  exports: [ShortenUrlService],
})
export class ShortenUrlModule {}