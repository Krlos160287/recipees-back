/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({ collection: 'users', versionKey: false })
export class Users {
  @Prop()
  _id?: Types.ObjectId;

  @Prop({ unique: true })
  nickname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
