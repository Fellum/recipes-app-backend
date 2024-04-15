import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Repository, In } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientFile } from './entities/ingredientFile.entity';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
    @InjectRepository(IngredientFile)
    private ingredientFilesRepository: Repository<IngredientFile>,
    @InjectRepository(File)
    private filesRepository: Repository<File>
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const {
      name,
      calories,
      proteins,
      fats,
      carbohydrates,
      files
    } = createIngredientDto;
 
    await this.filesRepository.update(
      {id: In(files.map(({id}) => id))}, 
      {type: 'IngredientFile'}
    );

    const foundFiles = await this.ingredientFilesRepository.find({
      where: {
        id: In(files.map(file => file.id))
      }
    });

    return this.ingredientsRepository.save({
      name,
      calories,
      proteins,
      fats,
      carbohydrates,
      files: foundFiles
    });
  }


  async findAll() {
    const [values, count] = await this.ingredientsRepository.findAndCount({
      relations: {
        files: true
      }
    });
    return {values, count};
  }

  findOne(id: number) {
    return this.ingredientsRepository.findOneByOrFail({id})
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    await this.ingredientsRepository.update({id}, updateIngredientDto);
    return this.ingredientsRepository.findOneBy({id});
  }

  remove(id: number) {
    return this.ingredientsRepository.delete({id}).then(() => 'Success');
  }
}
