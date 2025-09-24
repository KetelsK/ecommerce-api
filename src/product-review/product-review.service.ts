import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductReview } from './product-review.entity';
import { Repository } from 'typeorm';
import { CreateProductReviewDto } from './dto/create-product-review.dto';

@Injectable()
export class ProductReviewService {

    constructor(
        @InjectRepository(ProductReview)
        private productRepository: Repository<ProductReview>,
    ) { }

    create(data: CreateProductReviewDto): Promise<ProductReview> {
        const product = this.productRepository.create(data);
        return this.productRepository.save(product);
    }

    findAll(): Promise<ProductReview[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<ProductReview | null> {
        return this.productRepository.findOneBy({ id });
    }

    getProductReviewsByProductId(id: number): Promise<ProductReview[] | null> {
        return this.productRepository.findBy({ productId: id });
    }

    async update(id: number, data: CreateProductReviewDto): Promise<ProductReview> {
        const existing = await this.productRepository.findOneByOrFail({ id });
        const updated = this.productRepository.merge(existing, data);
        return this.productRepository.save(updated);
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
