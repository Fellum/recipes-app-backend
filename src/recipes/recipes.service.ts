import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { In, Repository } from 'typeorm';
import { RecipeEntry } from './entities/recipeEntry.entity';
import { Measure } from 'src/measures/entities/measure.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { File } from 'src/files/entities/file.entity';
import { RecipeFile } from './entities/recipeFile.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    @InjectRepository(RecipeFile)
    private recipeFilesRepository: Repository<RecipeFile>
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
    const {entries, files, ...entityToSave} = createRecipeDto;

    await this.filesRepository.update(
      {id: In(files.map(({id}) => id))}, 
      {type: 'RecipeFile'}
    );

    const foundFiles = await this.recipeFilesRepository.find({
      where: {
        id: In(files.map(file => file.id))
      }
    });
    const recipe = await this.recipesRepository.save({...entityToSave});

    const recipeEntries = this.createEntries(entries);
    recipe.entries = recipeEntries;
    recipe.files = foundFiles;
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
    return this.recipesRepository.findOneOrFail({
      relations: {
        entries: {
          measure: true,
          ingredient: true,
        },
        files: true
      },
      where: {id}
    })
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
