import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateShortenUrlDto {
  @ApiProperty({
    description: "URL a ser encurtada",
    example: "https://www.example.com",
  })
  @IsString()
  url: string;
}
