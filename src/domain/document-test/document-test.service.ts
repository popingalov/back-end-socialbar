import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentTestDto } from './dto/create-document-test.dto';
import { UpdateDocumentTestDto } from './dto/update-document-test.dto';
import { CocktailDocument, DocumentTest } from './shame/documentTest.schema';
@Injectable()
export class DocumentTestService {
  constructor(
    @InjectModel(DocumentTest.name)
    private readonly documentShme: Model<CocktailDocument>,
  ) {}
  async create(createDocumentTestDto = 3) {
    const count = await this.documentShme.countDocuments();

    return await this.documentShme.create({ testId: count + 1 });
  }

  findAll() {
    return `This action returns all documentTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentTest`;
  }

  update(id: number, updateDocumentTestDto: UpdateDocumentTestDto) {
    return `This action updates a #${id} documentTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentTest`;
  }
}
