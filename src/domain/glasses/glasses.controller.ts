import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { Glass } from './schema/glasses.schema';
import { GlassesService } from './glasses.service';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('glasses')
export class GlassesController {
  constructor(private readonly glassesService: GlassesService) {}

  @Get()
  async getAllGlasses(): Promise<Glass[]> {
    return await this.glassesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createGlass(@Body() body): Promise<Glass> {
    return await this.glassesService.createOne(body);
  }
}
