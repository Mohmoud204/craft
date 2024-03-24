import { PartialType } from '@nestjs/mapped-types';
import { CreateCrastDto } from './create-crast.dto';

export class UpdateCrastDto extends PartialType(CreateCrastDto) {}
