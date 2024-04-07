import { Module } from '@nestjs/common';
import { ImageWorkerService } from './image-worker.service';
import { ImageWorkerController } from './image-worker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Images, ImagesSchema } from "./entities/Image.entity"
import { ImageWorker } from './image-worker';
@Module({
  imports: [ MongooseModule.forFeature([{ name: Images.name, schema: ImagesSchema }])],
  controllers: [ImageWorkerController],
  providers: [ImageWorkerService, ImageWorker],
})
export class ImageWorkerModule { }
