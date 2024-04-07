import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CrastsModule } from './crasts/crasts.module';
import { WorkerModule } from './worker/worker.module';
import { ConfigModule } from '@nestjs/config';
import { join } from "path"
import { XSSMiddleware } from './xss.middleware';
import { ClientModule } from './client/client.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ImageWorkerModule } from './image-worker/image-worker.module';


@Module({
  imports: [CrastsModule,
    WorkerModule, ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ClientModule,
    DashboardModule,
    ImageWorkerModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XSSMiddleware).forRoutes('*');
  }
}
