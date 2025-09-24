import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsNumber()
    id: number;
    @IsString()
    email: string;
    @IsString()
    password: string;
}