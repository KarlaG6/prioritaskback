import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: '*', // donde corre Next.js
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
