import { Field, Int, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
@InputType()
export class Craft_input {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'the craft very short' })
  @MaxLength(15, { message: 'the craft very long' })
  craft: string
}