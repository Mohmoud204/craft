import { Module } from '@nestjs/common';
import { WorkerServicee } from './worker.service';
import { WorkerController } from './worker.controller';
import { Worker, WorkerSchema } from "./entities/worker.entity"
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: Worker.name, schema: WorkerSchema }])],
  controllers: [WorkerController],
  providers: [WorkerServicee],
})
export class WorkerModule { }
