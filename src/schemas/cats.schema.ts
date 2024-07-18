// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cats extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  breed: string;

  @Prop()
  age: number;
}

export const CatsSchema = SchemaFactory.createForClass(Cats);
