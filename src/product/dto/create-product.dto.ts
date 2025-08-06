import { IsString, IsNumber, IsOptional, IsDecimal } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    id: number;
    @IsString()
    name: string;
    @IsNumber({maxDecimalPlaces: 2})
    price: number;
}