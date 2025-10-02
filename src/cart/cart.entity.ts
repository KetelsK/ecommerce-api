import { User } from "src/auth/user.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ type: "int" })
    userId: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: "productId" })
    product: Product;

    @Column({ type: "int" })
    productId: number;

    @Column('int', { default: 1 })
    count: number;
}