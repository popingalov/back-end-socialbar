import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentTestDto } from './create-document-test.dto';

export class UpdateDocumentTestDto extends PartialType(CreateDocumentTestDto) {}
