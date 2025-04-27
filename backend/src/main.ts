import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use('/images', express.static(join(__dirname, '..', 'static/images')));
  app.use('/profiles', express.static(join(__dirname, '..', 'static/images/profiles')));
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();