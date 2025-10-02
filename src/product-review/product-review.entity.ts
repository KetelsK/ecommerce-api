import { User } from "src/auth/user.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('tinytext')
    review: string;

    @Column('float')
    rating: number;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column('int')
    userId: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column('int')
    productId: number;
}