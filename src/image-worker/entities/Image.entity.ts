import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Worker } from "../../worker/entities/worker.entity"
@Schema()
export class Images extends Document {
  @Prop({ type: { work_img: String, img_id: { type: String, default: null } } })
  WorkerImg: { work_img: string, img_id: string }

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  Img_Worker: string;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);