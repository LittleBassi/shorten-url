import {
  Controller,
  Get,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { ShortenUrlService } from "./shorten-url.service";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthRequired } from "src/guards/auth.guard";

@ApiTags("Shorten")
@Controller()
export class RedirectUrlController {
  constructor(protected readonly shortenUrlService: ShortenUrlService) {}

  @ApiOperation({ summary: "Redirecionar para a URL original" })
  @ApiResponse({ status: 307, description: "Redirecionado com sucesso" })
  @ApiResponse({ status: 404, description: "URL não encontrada" })
  @Get(":code")
  @AuthRequired(false)
  async redirect(@Param("code") code: string) {
    const shortenedUrl = await this.shortenUrlService.findByCode(code);
    return { url: shortenedUrl.url, statusCode: HttpStatus.TEMPORARY_REDIRECT };
  }
}
