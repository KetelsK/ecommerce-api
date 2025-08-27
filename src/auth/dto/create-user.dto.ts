import { IsString, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    id: number;
    @IsString()
    email: string;
    @IsString()
    password: string;
}