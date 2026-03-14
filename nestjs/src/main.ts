import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigin = process.env.CLIENT_URL ?? 'http://localhost:3000';
  app.enableCors({ origin: allowedOrigin, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Gurinder School API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, config));

  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  console.log(`NestJS running on port ${port}`);
}
bootstrap();
