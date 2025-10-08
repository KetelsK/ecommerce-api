import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "../cart.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cart, cart => cart, { onDelete: "CASCADE" })
    @JoinColumn({ name: "cartId" })
    cart: Cart;

    @Column({ type: "int", select: false })
    cartId: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: "productId" })
    product: Product;

    @Column({ type: "int" , select: false })
    productId: number;

    @Column('int', { default: 1 })
    quantity: number;
}