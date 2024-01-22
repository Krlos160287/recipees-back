/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from 'src/models/categoria.dto';
import { IngredientesService } from 'src/services/categoria.service';
import { IngredientesController } from './controller/categoria.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }])],
  controllers: [IngredientesController],
  providers: [IngredientesService],
})
export class IngredientesModule {}
