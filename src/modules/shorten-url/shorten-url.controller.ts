import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdateShortenUrlDto } from "./dto/update-shorten-url.dto";

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

  @ApiOperation({ summary: "Buscar URLs encurtadas do usuário" })
  @ApiResponse({ status: 200, description: "URLs encurtadas do usuário" })
  @ApiResponse({ status: 400, description: "Usuário não encontrado" })
  @ApiBearerAuth("jwt")
  @Get()
  async findByUser(@Request() req: Req) {
    const userId = req.user?.id || null;
    return await this.shortenUrlService.findByUserId(userId);
  }

  @ApiOperation({ summary: "Editar URL encurtada do usuário por ID" })
  @ApiResponse({ status: 200, description: "URL do usuário editada com sucesso" })
  @ApiResponse({ status: 400, description: "Usuário ou URL não encontrados" })
  @ApiBearerAuth("jwt")
  @Patch(":id")
  async update(@Param("id") id: number, @Body() dto: UpdateShortenUrlDto, @Request() req: Req) {
    const userId = req.user?.id || null;
    return await this.shortenUrlService.update(id, dto, userId);
  }

  @ApiOperation({ summary: "Remover URL encurtada do usuário por ID" })
  @ApiResponse({ status: 200, description: "URL do usuário excluída com sucesso" })
  @ApiResponse({ status: 400, description: "Usuário ou URL não encontrados" })
  @ApiBearerAuth("jwt")
  @Delete(":id")
  async remove(@Param("id") id: number, @Request() req: Req) {
    const userId = req.user?.id || null;
    return await this.shortenUrlService.remove(id, userId);
  }
}
