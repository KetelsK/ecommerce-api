import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './interfaces/cart.interface';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cart[] | null> {
    return this.cartService.getCartByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateCartDto): Promise<Cart> {
    return this.cartService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cartService.delete(id);
  }
}
