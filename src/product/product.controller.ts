import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @HttpCode(200)
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

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

    @Put(':id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateProductDto): Promise<Product> {
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id', ParseIntPipe) id: any): Promise<void> {
        await this.productService.delete(id);
    }
}