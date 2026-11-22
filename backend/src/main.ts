import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'https://trippant-samira-shiny.ngrok-free.dev',
    'https://final-quest.vercel.app',
    'https://final-quest-git-cd-deploy-marllon-wendel2s-projects.vercel.app',
    'http://marllon-desktop:3001',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Permite requests sem origin (ex: Postman, mobile apps, SSR)
      if (!origin) return callback(null, true);
      // Em desenvolvimento, aceita qualquer localhost independente da porta
      if (process.env.NODE_ENV !== 'production' && /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS bloqueado para origin: ${origin}`));
    },
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Final Quest API')
    .setDescription('API do jogo Final Quest')
    .setVersion('1.0')
    .addCookieAuth('token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
