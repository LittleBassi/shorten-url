import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Email do usuário",
    example: "foo@example.com",
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    example: "Senha123*",
    minLength: 8,
  })
  @IsString()
  password: string;
}
