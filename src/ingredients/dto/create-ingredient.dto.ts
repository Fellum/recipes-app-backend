import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

class FileItemDto {
    @IsString()
    purpose: string;

    @IsNumber()
    id: number;
}

export class CreateIngredientDto {
    @IsString()
    name: string;

    @IsNumber()
    calories: number;

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
