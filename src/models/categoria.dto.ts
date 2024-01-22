/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema({ collection: 'ingredientes' })
export class Ingredient {

  @Prop({ type: Types.ObjectId, auto: true })
  _id: string;

  @Prop()
  id: string;

  @Prop()
  categoria: string;

  @Prop()
  ingredientes: any[];
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
