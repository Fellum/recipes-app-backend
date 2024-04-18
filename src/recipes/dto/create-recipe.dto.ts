import { IsNumber, IsOptional } from "class-validator";

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
}
