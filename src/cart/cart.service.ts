import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) { }

    getCartByUserId(userId: number): Promise<Cart[] | null> {
        return this.cartRepository.findBy({ userId: userId });
    }

    async create(data: CreateCartDto): Promise<Cart> {
        // check if cart for this productId + userId already exists
        // if it exists -> increment the count
        const found = await this.cartRepository.findOneBy({ productId: data.productId, userId: data.userId });
        if (found) {
            found.count++;
            return this.cartRepository.save(found);
        }
        const cart = this.cartRepository.create(data);
        return this.cartRepository.save(cart);
    }

    async delete(id: number): Promise<void> {
        await this.cartRepository.delete(id);
    }
}
