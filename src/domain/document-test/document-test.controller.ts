import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentTestService } from './document-test.service';
import { CreateDocumentTestDto } from './dto/create-document-test.dto';
import { UpdateDocumentTestDto } from './dto/update-document-test.dto';

@Controller('document-test')
export class DocumentTestController {
  constructor(private readonly documentTestService: DocumentTestService) {}

  @Post()
  create(@Body() createDocumentTestDto) {
    return this.documentTestService.create(createDocumentTestDto);
  }

  @Get()
  findAll() {
    return this.documentTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentTestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentTestDto: UpdateDocumentTestDto,
  ) {
    return this.documentTestService.update(+id, updateDocumentTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentTestService.remove(+id);
  }
}
