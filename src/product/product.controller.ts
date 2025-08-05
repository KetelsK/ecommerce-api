import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
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
}