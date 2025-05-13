import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { ShortenUrlService } from "./shorten-url.service";
import { CreateShortenUrlDto } from "./dto/create-shorten-url.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { url } from "inspector";

@ApiTags("Shorten")
@Controller()
export class ShortenUrlController {
    constructor(
        protected readonly shortenUrlService: ShortenUrlService,
    ) {}

    @ApiOperation({ summary: 'Encurtar uma URL' })
    @ApiBody({ type: CreateShortenUrlDto })
    @ApiResponse({ status: 201, description: 'URL encurtada com sucesso' })
    @ApiResponse({ status: 400, description: 'URL inválida' })
    @Post('shorten')
    async create(@Body() dto: CreateShortenUrlDto) {
        const url = await this.shortenUrlService.create(dto);
        return { url };
    }

    @ApiOperation({ summary: 'Redirecionar para a URL original' })
    @ApiResponse({ status: 307, description: 'Redirecionado com sucesso' })
    @ApiResponse({ status: 404, description: 'URL não encontrada' })
    @Get(':code')
    async redirect(@Param('code') code: string) {
        const shortenedUrl = await this.shortenUrlService.findByCode(code);
        return { url: shortenedUrl.url, statusCode: HttpStatus.TEMPORARY_REDIRECT };
    }
}