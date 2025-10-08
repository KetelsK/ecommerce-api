import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item/cart-item.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ type: "int" })
    userId: number;

    @OneToMany(() => CartItem, item => item.cart, { cascade: true, eager: true })
    items: CartItem[];
}