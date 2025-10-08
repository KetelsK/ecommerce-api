import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from './product/product.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/user.entity';
import { ProductReviewModule } from './product-review/product-review.module';
import { ProductReview } from './product-review/product-review.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart/cart-item/cart-item.entity';
import { CartItemModule } from './cart/cart-item/cart-item.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecommerce',
      entities: [Product, ProductReview, User, Cart, CartItem],
      autoLoadEntities: true,
      synchronize: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProductReviewModule,
    CartModule,
    CartItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // 
  }
}
