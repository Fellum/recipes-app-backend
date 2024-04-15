import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasuresModule } from './measures/measures.module';
import { RecipesModule } from './recipes/recipes.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      autoLoadEntities: true
    }),
    IngredientsModule,
    MeasuresModule,
    RecipesModule,
    FilesModule,
  ],
})
export class AppModule {}
