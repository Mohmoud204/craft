// import { IsMongoId } from 'class-validator';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
export class CreateCrastDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'the craft very short' })
  @MaxLength(15, { message: 'the craft very long' })
  craft: string
}

