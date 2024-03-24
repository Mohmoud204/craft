import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CrastsModule } from './crasts/crasts.module';
import { WorkerModule } from './worker/worker.module';
import { ConfigModule } from '@nestjs/config';
import { join } from "path"
@Module({
  imports: [CrastsModule,
  WorkerModule,ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.DATABASE_URL)
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
