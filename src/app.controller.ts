import { Controller, Get, Header, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(200)
  findAll(): string {
    return this.appService.getUser();
  }



  @Post()
  @HttpCode(201)
  create(): string {
    return this.appService.createUser();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param() params: any): string {
    return this.appService.getUserById(params.id);
  }
}
