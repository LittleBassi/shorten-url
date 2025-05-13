import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRequired } from "src/guards/auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: "Login efetuado com sucesso" })
  @ApiResponse({
    status: 400,
    description: "email ou senha inválidos",
  })
  @AuthRequired(false)
  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
