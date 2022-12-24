import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
// import { config } from 'dotenv';
// config();

import { AppModule } from 'app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // app.use(
  //   session({
  //     name: 'SERVER_SESSION_ID',
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: true,
  //   }),
  // );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT);
}

bootstrap();
