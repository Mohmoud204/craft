// worker.entity.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Crafts } from "../../crasts/entities/crast.entity"
@Schema()
export class Worker extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  description: string;

  @Prop({ type: { avatar: String, img_id: String } })
  profile_img: { avatar: string, img_id: string };

  @Prop([{ work_img: String, img_id: String }])
  work_imgs: { work_img: string, img_id: string }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Crafts' })
  craft_id: string; // Reference to Craft schema
 

  @Prop({ default: "user" })
  role: string
  @Prop({ default: "waiting" })
  wait: string;
  @Prop({ default: false })
  active: boolean;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
