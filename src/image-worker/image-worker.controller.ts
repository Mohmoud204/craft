import { Controller, Post, UseInterceptors, Body, UploadedFile, Param } from '@nestjs/common';
import { ImageWorkerService } from './image-worker.service';
import { Express } from "express"
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
@ApiTags('image')
@Controller('imageWorker')
export class ImageWorkerController {
  constructor(private readonly imageWorkerService: ImageWorkerService) { }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Param("id") body) {
    return this.imageWorkerService.uploadFile(file, body);
  }
}
