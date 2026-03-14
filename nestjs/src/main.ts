import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle('Gurinder School API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('swagger', app, SwaggerModule.createDocument(app, config));

  await app.listen(3002);
  console.log('NestJS running on http://localhost:3002');
  console.log('Swagger docs at http://localhost:3002/swagger');
}
bootstrap();
