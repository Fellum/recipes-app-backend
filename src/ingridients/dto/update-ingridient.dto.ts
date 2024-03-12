import { PartialType } from '@nestjs/mapped-types';
import { CreateIngridientDto } from './create-ingridient.dto';

export class UpdateIngridientDto extends PartialType(CreateIngridientDto) {}
