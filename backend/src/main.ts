import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://trippant-samira-shiny.ngrok-free.dev',
      'https://final-quest.vercel.app',
      'https://final-quest-git-cd-deploy-marllon-wendel2s-projects.vercel.app',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
