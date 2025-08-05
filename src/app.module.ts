import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from './product/product.entity';

@Module({
  imports: [ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecommerce',
      entities: [Product],
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [UserController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // 
  }
}
