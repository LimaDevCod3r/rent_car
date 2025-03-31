import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // obter o serviço de configuração
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Permite o envio de cookies e cabeçalhos de autenticação
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(port ?? 3000);
}
bootstrap().catch((error) => {
  logger.error('Falha ao iniciar à aplicação:', error);
  process.exit(1);
});
