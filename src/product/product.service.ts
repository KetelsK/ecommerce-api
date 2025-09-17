import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    create(data: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(data);
        return this.productRepository.save(product);
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<Product | null> {
        return this.productRepository.findOneBy({ id });
    }

    async update(id: number, data: CreateProductDto): Promise<Product> {
        const existing = await this.productRepository.findOneByOrFail({ id });
        const updated = this.productRepository.merge(existing, data);
        return this.productRepository.save(updated);
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}
