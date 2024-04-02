import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(helmet());
  const options = new DocumentBuilder().addBearerAuth();
  const config = new DocumentBuilder()
    .setTitle('craft example')
    .setDescription('The craft API description')
    .setVersion('1.0')
    .addTag('craft')
   .addBearerAuth({
      type:"http",
      scheme:"bearer",
      bearerFormat:"JWT",
      name:"JWT",
      description:"Enter jwt token",
      in:"header"
    },"Jwt-auth")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
