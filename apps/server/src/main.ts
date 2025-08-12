import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('MeDrive API')
    .setDescription('API documentation for the MeDrive server')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  setupSwagger(app);

  // Serve local uploads directory (for local storage driver)
  const config = app.get(ConfigService);
  const uploadsDir =
    config.get<string>('UPLOADS_DIR') || path.join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
