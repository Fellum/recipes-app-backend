import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientFile } from './entities/ingredientFile.entity';
import { FilesModule } from 'src/files/files.module';
import { File } from 'src/files/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient, IngredientFile, File]),
    FilesModule
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
