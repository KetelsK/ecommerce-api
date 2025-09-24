import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReview } from './product-review.entity';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('productreview')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) { }

  @Get()
  @HttpCode(200)
  findAll(): Promise<ProductReview[]> {
    return this.productReviewService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateProductReviewDto): Promise<ProductReview> {
    return this.productReviewService.create(dto);
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductReview[] | null> {
    return this.productReviewService.getProductReviewsByProductId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateProductReviewDto): Promise<ProductReview> {
    return this.productReviewService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productReviewService.delete(id);
  }
}
