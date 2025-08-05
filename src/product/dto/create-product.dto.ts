import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    id: number;
    @IsString()
    name: string;
    @IsNumber()
    price: number;
}