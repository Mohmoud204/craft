import {
  IsString,
  IsUrl
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class imgWorker{
  @ApiProperty()
  @IsUrl()
  work_img: string
  @IsString()
  img_id: string
  @IsString()
  Img_Worker: string
}