import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeEntry } from './entities/recipeEntry.entity';
import { RecipeFile } from './entities/recipeFile.entity';
import { File } from 'src/files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeEntry, RecipeFile, File])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
