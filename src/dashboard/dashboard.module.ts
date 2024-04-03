import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ClientModule } from ".././client/client.module"
import { CrastsModule } from ".././crasts/crasts.module"
import { WorkerModule } from ".././worker/worker.module"
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DashboardSchema, Dashboard } from "./entities/dashboard.entities"
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forFeature([{ name: Dashboard.name, schema: DashboardSchema }])
  
    , ClientModule
    , CrastsModule,
    WorkerModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }
