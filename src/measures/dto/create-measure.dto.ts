import { IsNumber, IsString } from "class-validator";

export class CreateMeasureDto {
    @IsString()
    name: string;

    @IsNumber()
    ratio: number;
}
