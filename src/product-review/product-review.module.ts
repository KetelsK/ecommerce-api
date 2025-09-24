import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { ProductReview } from './product-review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview])],
  controllers: [ProductReviewController],
  providers: [ProductReviewService],
})
export class ProductReviewModule { }
