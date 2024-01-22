/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Ingredient } from 'src/models/categoria.dto';
import { IngredientesService } from 'src/services/categoria.service';


@Controller('ingredientes')
export class IngredientesController {
  constructor(private ingredientesService: IngredientesService) {}

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientesService.findOne(id);
  }

  @Post()
  async create(@Body() ingredientDto: Ingredient): Promise<Ingredient> {
    return this.ingredientesService.create(ingredientDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() ingredientDto: Ingredient): Promise<Ingredient> {
    return this.ingredientesService.update(id, ingredientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientesService.delete(id);
  }
}
