import { IsNumber, IsString } from 'class-validator';

export class AddFileDto {
    @IsString()
    purpose: string;

    @IsNumber()
    fileId: number;
}
