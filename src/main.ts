import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { config as awsConfig } from 'aws-sdk';
import rateLimit from 'express-rate-limit';
config();
const PORT = process.env.PORT || 5000;

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 250,
  message: 'Error 429. Request Limit.',
});

async function bootstrap() {
  awsConfig.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(
    session({
      name: 'SERVER_SESSION_ID',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.NODE_ENV === 'PRODUCTION' ? true : false,
    }),
  );
  app.use('/api', apiLimiter);
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}

bootstrap();
