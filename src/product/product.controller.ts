import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
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
    findOne(@Param() params: any): Promise<Product | null> {
        return this.productService.findOne(params.id);
    }

    @Put(':id')
    @HttpCode(200)
    update(@Param() params: any, @Body() dto: CreateProductDto): Promise<Product> {
        const id = params.id;
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param() params: any): Promise<void> {
        const id = params.id;
        await this.productService.delete(id);
    }
}