import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  exports: [JwtModule],
})
export class PublickModule {}
