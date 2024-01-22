/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, IngredientDocument } from 'src/models/categoria.dto';


@Injectable()
export class IngredientesService {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<IngredientDocument>,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async findOne(id: string): Promise<Ingredient> {
    return this.ingredientModel.findById(id).exec();
  }

  async create(ingredientDto: Ingredient): Promise<Ingredient> {
    const createdIngredient = new this.ingredientModel(ingredientDto);
    return createdIngredient.save();
  }

  async update(id: string, ingredientDto: Ingredient): Promise<Ingredient> {
    return this.ingredientModel
      .findByIdAndUpdate(id, ingredientDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Ingredient> {
    return this.ingredientModel.findByIdAndDelete(id).exec();
  }
}
