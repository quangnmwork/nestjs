import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ZodExceptionFilter } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ZodExceptionFilter());
  app.setGlobalPrefix('/api');
  app.use(
    session({
      secret: 'secret-key',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
