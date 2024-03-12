import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Res, Body } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    dest: './uploads'
  }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File) {
    return this.filesService.create(file)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const fileEntry = await this.filesService.findOne(+id);
    res.setHeader('Content-Type', fileEntry.mimetype);
    createReadStream(fileEntry.internalPath).pipe(res)
    return this.filesService.findOne(+id);
  }
  
}
