import { Injectable } from '@nestjs/common';
import { CreateIngridientDto } from './dto/create-ingridient.dto';
import { UpdateIngridientDto } from './dto/update-ingridient.dto';
import { Repository, In } from 'typeorm';
import { Ingridient } from './entities/ingridient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IngridientFile } from './entities/ingridientFile.entity';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class IngridientsService {
  constructor(
    @InjectRepository(Ingridient)
    private ingridientsRepository: Repository<Ingridient>,
    @InjectRepository(IngridientFile)
    private ingridientFilesRepository: Repository<IngridientFile>,
    @InjectRepository(File)
    private filesRepository: Repository<File>
  ) {}

  async create(createIngridientDto: CreateIngridientDto) {
    const {
      name,
      calories,
      proteins,
      fats,
      carbohydrates,
      files
    } = createIngridientDto;
 
    await this.filesRepository.update(
      {id: In(files.map(({fileId}) => fileId))}, 
      {type: 'IngridientFile'}
    );

    const foundFiles = await this.ingridientFilesRepository.find({
      where: {
        id: In(files.map(file => file.fileId))
      }
    });

    return this.ingridientsRepository.save({
      name,
      calories,
      proteins,
      fats,
      carbohydrates,
      files: foundFiles
    });
  }


  async findAll() {
    const [values, count] = await this.ingridientsRepository.findAndCount({
      relations: {
        files: true
      }
    });
    return {values, count};
  }

  findOne(id: number) {
    return this.ingridientsRepository.findOneByOrFail({id})
  }

  async update(id: number, updateIngridientDto: UpdateIngridientDto) {
    await this.ingridientsRepository.update({id}, updateIngridientDto);
    return this.ingridientsRepository.findOneBy({id});
  }

  remove(id: number) {
    return this.ingridientsRepository.delete({id}).then(() => 'Success');
  }
}
