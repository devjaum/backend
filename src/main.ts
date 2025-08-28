import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: '*', // ou 'http://localhost:3001' para mais segurança
  });
  await app.listen(port);

  console.log(`Backend rodando na porta ${port}`);

}
bootstrap();
