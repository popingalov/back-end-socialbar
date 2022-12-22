import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { GlassesService } from './glasses.service';

import { JwtAuthGuard } from 'domain/auth/strategies/jwt.guard';

@Controller('glasses')
export class GlassesController {
  constructor(private readonly glassesService: GlassesService) {}

  @Get()
  async getAllGlasses() {
    return await this.glassesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createGlass(@Body() body) {
    return await this.glassesService.createOne(body);
  }
}