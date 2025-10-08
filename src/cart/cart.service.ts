import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartItem } from './cart-item/cart-item.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
    ) { }

    getCartByUserId(userId: number): Promise<Cart | null> {
        return this.cartRepository.findOneBy({ userId: userId });
    }

    async create(data: CreateCartDto): Promise<any> {
        // check if cart for this userId already exists
        let cartFound = await this.cartRepository.findOneBy({ userId: data.userId });
        // if it doesn't exist -> create it
        if (!cartFound) {
            const cart = this.cartRepository.create(data);
            cartFound = await this.cartRepository.save(cart);
        }
        // check if cart item already exists
        const cartItemFound = await this.cartItemRepository.findOneBy({ cartId: cartFound.id, productId: data.productId });
        // if it exists -> increment quantity
        if (cartItemFound) {
            cartItemFound.quantity++;
            await this.cartItemRepository.save(cartItemFound);
            return this.cartRepository.findOneBy({ userId: data.userId });
        }
        // if it doesn't exist -> create it
        else {
            const newCartItem = {
                cartId: cartFound?.id,
                productId: data.productId,
                quantity: 1
            }
            const cartItem = this.cartItemRepository.create(newCartItem);
            await this.cartItemRepository.save(cartItem);
            return this.cartRepository.findOneBy({ userId: data.userId });
        }
    }

    async delete(id: number): Promise<void> {
        await this.cartItemRepository.delete(id);
    }
}
