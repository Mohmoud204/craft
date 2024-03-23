import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerResolver } from './worker.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from "./Database/Worker.db"

@Module({
  imports: [MongooseModule.forFeature([{ name: Worker.name, schema: WorkerSchema }])],
  providers: [WorkerResolver, WorkerService],
})
export class WorkerModule { }
