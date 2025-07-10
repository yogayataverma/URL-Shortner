import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ShortUrl extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ required: true })
  owner: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
