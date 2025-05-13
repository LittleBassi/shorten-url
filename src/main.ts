import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
const { NODE_ENV } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: NODE_ENV === "production" ? ["error", "fatal"] : undefined,
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("URL Shortener")
    .setDescription("API para encurtar URLs")
    .setVersion("1.0")
    .addTag("Shorten")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "jwt",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "method",
    }
  });
  await app.listen(configService.getOrThrow("PORT"));
}
bootstrap();
