import {
  Body,
  Controller,
  Post,
  Request,
} from "@nestjs/common";
import { ShortenUrlService } from "./shorten-url.service";
import { CreateShortenUrlDto } from "./dto/create-shorten-url.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthRequired } from "src/guards/auth.guard";
import { Request as Req } from "express";

@ApiTags("Shorten")
@Controller("url")
export class ShortenUrlController {
  constructor(protected readonly shortenUrlService: ShortenUrlService) {}

  @ApiOperation({ summary: "Encurtar uma URL" })
  @ApiBody({ type: CreateShortenUrlDto })
  @ApiBearerAuth("jwt")
  @ApiResponse({ status: 201, description: "URL encurtada com sucesso" })
  @ApiResponse({ status: 400, description: "URL inválida" })
  @Post("shorten")
  @AuthRequired(false)
  async create(@Body() dto: CreateShortenUrlDto, @Request() req: Req) {
    const userId = req.user?.id ?? undefined;
    const url = await this.shortenUrlService.create(dto, userId);
    return { url };
  }
}
