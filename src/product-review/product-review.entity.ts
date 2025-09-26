import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductReview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('tinytext')
    review: string;

    @Column('float')
    rating: number;

    @ManyToOne(() => User, { eager: true})
    @JoinColumn({ name: 'userId' }) // on force le nom de la FK
    user: User;

    @Column('int')
    @ManyToOne(() => User)
    userId: number;

    @Column('int')
    productId: number;
}