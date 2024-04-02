import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';
export class CreateCrastDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'the craft very short' })
  @MaxLength(15, { message: 'the craft very long' })
  @Matches(/^[^<>]*$/, { message: 'Username must not contain < or >' })
  craft: string
}

