// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Crafts } from "../../crasts/Database/Crafts.db"
import * as mongoose from 'mongoose';
@Schema()
export class Worker extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  profile_picture: string;

  @Prop({ type: [{ url_img: String, id_img: String }] })
  work_pictures: { url_img: string, id_img: string }[];

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Crafts' })

  crafts_id: Crafts
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
