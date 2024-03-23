import { Module } from '@nestjs/common';
import { CrastsService } from './crasts.service';
import { CrastsResolver } from './crasts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Crafts, craftSchema } from "./Database/Crafts.db"

@Module({
  imports: [MongooseModule.forFeature([{ name: Crafts.name, schema: craftSchema }])],
  providers: [CrastsResolver, CrastsService],
  exports: []
})
export class CrastsModule { }
