import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class FileItemDto {
    @IsString()
    purpose: string;

    @IsNumber()
    id: number;
}

export class CreateRecipeDto {
    name: string;
    entries: any[];
    requiredTools: any[];
    steps: any[];
    cookingTime: number;
    servingsCount: number;

    @IsOptional()
    @IsNumber()
    calories: number;
    @IsOptional()
    @IsNumber()
    proteins: number;
    @IsOptional()
    @IsNumber()
    fats: number;
    @IsOptional()
    @IsNumber()
    carbohydrates: number;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => FileItemDto)
    files: FileItemDto[];
}
