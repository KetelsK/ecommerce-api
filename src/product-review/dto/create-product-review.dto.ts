import { IsString, IsOptional, MaxLength, IsNumber } from "class-validator";

export class CreateProductReviewDto {
    @IsOptional()
    @IsNumber()
    id: number;
    @IsString()
    @MaxLength(255)
    review: string;
    @IsNumber()
    rating: number;
    @IsNumber()
    userId: number;
    @IsNumber()
    productId: number;
}