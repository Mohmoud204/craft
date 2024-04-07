import { Module } from '@nestjs/common';
import { WorkerServicee } from './worker.service';
import { WorkerController } from './worker.controller';
import { Worker, WorkerSchema } from "./entities/worker.entity"
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { WorkerProvider } from './worker';
@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forFeature([{ name: Worker.name, schema: WorkerSchema }]),
  JwtModule.register({
    global: true,
    secret: process.env.SECRET_TOKEN,
    signOptions: { expiresIn: '15m' },
  }),
  ],
  controllers: [WorkerController],
  providers: [WorkerServicee, WorkerProvider],
  exports: [WorkerServicee]
})
export class WorkerModule { }
