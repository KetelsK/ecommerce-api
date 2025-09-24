import { IsString, IsNumber, IsOptional, Matches } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    id: number;
    @IsString()
    name: string;
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;
    @IsString()
    @Matches(/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/)
    image: string;
}