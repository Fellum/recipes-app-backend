import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IngridientsService } from './ingridients.service';
import { CreateIngridientDto } from './dto/create-ingridient.dto';
import { UpdateIngridientDto } from './dto/update-ingridient.dto';

@Controller('ingridients')
export class IngridientsController {
  constructor(private readonly ingridientsService: IngridientsService) {}

  @Post()
  create(@Body() createIngridientDto: CreateIngridientDto) {
    return this.ingridientsService.create(createIngridientDto);
  }

  @Get()
  findAll() {
    return this.ingridientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingridientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngridientDto: UpdateIngridientDto) {
    return this.ingridientsService.update(+id, updateIngridientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingridientsService.remove(+id);
  }
}
