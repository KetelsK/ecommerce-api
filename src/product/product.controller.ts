import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @HttpCode(200)
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(201)
    create(@Body() dto: CreateProductDto): Promise<Product> {
        return this.productService.create(dto);
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
        return this.productService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateProductDto): Promise<Product> {
        return this.productService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.productService.delete(id);
    }
}