import { Injectable } from '@nestjs/common';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measure } from './entities/measure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectRepository(Measure)
    private measuresRepository: Repository<Measure>
  ) {}

  create(createMeasureDto: CreateMeasureDto) {
    return this.measuresRepository.save(createMeasureDto);
  }

  async findAll() {
    const [values, count] = await this.measuresRepository.findAndCount();
    return {values, count};
  }

  findOne(id: number) {
    return this.measuresRepository.findOneByOrFail({id})
  }

  async update(id: number, updateMeasureDto: UpdateMeasureDto) {
    await this.measuresRepository.update({id}, updateMeasureDto);
    return this.measuresRepository.findOneBy({id});
  }

  remove(id: number) {
    return this.measuresRepository.delete({id}).then(() => 'Success');
  }
}
