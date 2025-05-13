import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AuthRequired } from "src/guards/auth.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Cadastrar novo usuário" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "Usuário cadastrado com sucesso" })
  @ApiResponse({ status: 400, description: "Usuário já existe" })
  @ApiResponse({ status: 422, description: "Erro ao criar usuário" })
  @Post()
  @AuthRequired(false)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
