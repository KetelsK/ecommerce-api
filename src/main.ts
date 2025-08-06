import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Supprime les champs qui ne sont pas dans le DTO
      forbidNonWhitelisted: true, // Erreur si des champs non prévus sont envoyés
      transform: true,        // Transforme les types (ex: string en number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
