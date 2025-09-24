import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('tinytext')
    review: string;

    @Column('float')
    rating: number;

    @Column('int')
    userId: number;

    @Column('int')
    productId: number;
}