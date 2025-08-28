import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // ou 'http://localhost:3001' para mais segurança
  });
  await app.listen(3001);
}
bootstrap();
