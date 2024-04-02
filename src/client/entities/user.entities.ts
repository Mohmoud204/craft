// worker.entity.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;


  @Prop({ type: { avatar: String, img_id: String } })
  profile_img: { avatar: string, img_id: string };

  @Prop({ default: "user" })
  role: string
  @Prop({ default: "waiting" })
  wait: string;
  @Prop({ default: false })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
