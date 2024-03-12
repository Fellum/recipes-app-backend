import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { posix } from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>
  ) {}
  create(file: Express.Multer.File) {
    return this.filesRepository.save({
      encoding: file.encoding,
      mimetype: file.mimetype,
      filename: file.originalname,
      size: file.size,
      internalPath: posix.join(file.destination, file.filename)
    });
  }

  async findOne(id: number) {
    return this.filesRepository.findOneByOrFail({id});
  }
}
