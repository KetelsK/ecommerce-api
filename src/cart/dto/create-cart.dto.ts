import { IsNumber, IsOptional } from "class-validator";

export class CreateCartDto {
    @IsOptional()
    id: number
    @IsNumber()
    productId: number;
    @IsNumber()
    userId: number;
}