import { Module } from '@nestjs/common';
import { IngridientsService } from './ingridients.service';
import { IngridientsController } from './ingridients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingridient } from './entities/ingridient.entity';
import { IngridientFile } from './entities/ingridientFile.entity';
import { FilesModule } from 'src/files/files.module';
import { File } from 'src/files/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingridient, IngridientFile, File]),
    FilesModule
  ],
  controllers: [IngridientsController],
  providers: [IngridientsService],
})
export class IngridientsModule {}
