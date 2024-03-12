import { Injectable } from '@nestjs/common';
import { CreateIngridientDto } from './dto/create-ingridient.dto';
import { UpdateIngridientDto } from './dto/update-ingridient.dto';
import { Repository, In } from 'typeorm';
import { Ingridient } from './entities/ingridient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IngridientFile } from './entities/ingridientFile.entity';
import { File } from 'src/files/entities/file.entity';
import { AddFileDto } from './dto/add-file.dto';

@Injectable()
export class IngridientsService {
  constructor(
    @InjectRepository(Ingridient)
    private ingridientsRepository: Repository<Ingridient>,
    @InjectRepository(IngridientFile)
    private ingridientFilesRepository: Repository<IngridientFile>,
  ) {}

  createFiles(files) {
    return files.map(entry => {
      const newEntry = new IngridientFile();
      newEntry.id = entry.fileId;
      newEntry.purpose = entry.purpose;
      return newEntry;
    });
  }

  async create(createIngridientDto: CreateIngridientDto) {
    const {
      name,
      callories,
      proteins,
      fats,
      carbohydrates
    } = createIngridientDto;

    return this.ingridientsRepository.save({
      name,
      callories,
      proteins,
      fats,
      carbohydrates
    });
  }

  async addFile(addFileDto: AddFileDto, file: Express.Multer.File) {
    const foundIngredient = await this.ingridientFilesRepository.findOneByOrFail({id: addFileDto.fileId});
    
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
