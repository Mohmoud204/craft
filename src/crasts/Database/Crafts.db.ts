// craft.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Crafts extends Document {
 @Prop({ required: true, unique: true })
 craft: string;
}
export const craftSchema = SchemaFactory.createForClass(Crafts);