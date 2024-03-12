import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

class FileItemDto {
    @IsString()
    purpose: string;

    @IsNumber()
    fileId: number;
}

export class CreateIngridientDto {
    @IsString()
    name: string;

    @IsNumber()
    callories: number;

    @IsNumber()
    proteins: number;

    @IsNumber()
    fats: number;

    @IsNumber()
    carbohydrates: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => FileItemDto)
    files: FileItemDto[];
}
