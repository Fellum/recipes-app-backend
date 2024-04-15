import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { RecipeEntry } from './entities/recipeEntry.entity';
import { Measure } from 'src/measures/entities/measure.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>
  ) {}

  createEntries(entries) {
    return entries.map(entry => {
      const newEntry = new RecipeEntry();
      const measure = new Measure();
      measure.id = entry.measureId;
      const ingredient = new Ingredient();
      ingredient.id = entry.ingredientId;

      newEntry.measure = measure;
      newEntry.ingredient = ingredient;
      newEntry.amount = entry.measureId;
      return newEntry;
    });
  }

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = await this.recipesRepository.save({
      name: createRecipeDto.name
    });
    const recipeEntries = this.createEntries(createRecipeDto.entries);
    recipe.entries = recipeEntries;
    return this.recipesRepository.save(recipe);
  }

  async findAll() {
    const [values, count] = await this.recipesRepository.findAndCount({
      relations: {
        entries: {
          measure: true,
          ingredient: true
        }
      }
    });
    return {values, count};
  }

  findOne(id: number) {
    return this.recipesRepository.findOneByOrFail({id})
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const foundRecipe = await this.recipesRepository.findOneByOrFail({id});
    if(updateRecipeDto.entries) {
      foundRecipe.entries = this.createEntries(updateRecipeDto.entries);
    }
    if(updateRecipeDto.name) {
      foundRecipe.name = updateRecipeDto.name;
    }
    return await this.recipesRepository.save(foundRecipe);
  }

  remove(id: number) {
    return this.recipesRepository.delete({id}).then(() => 'Success');
  }
}
