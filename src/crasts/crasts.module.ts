import { Module } from '@nestjs/common';
import { CrastsService } from './crasts.service';
import { CrastsController } from './crasts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Crafts, craftSchema } from "./entities/crast.entity"
@Module({
  imports: [MongooseModule.forFeature([{ name: Crafts.name, schema: craftSchema }])],
  controllers: [CrastsController],
  providers: [CrastsService],
})
export class CrastsModule { }
