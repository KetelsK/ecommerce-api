import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService) { }

  @Post('login')
  async login(@Body() user: CreateUserDto): Promise<{ access_token: string }> {
    if (await this.authService.checkCredentials(user)) {
      return this.authService.login(user);
    }
    throw new UnauthorizedException('Identifiants invalides');
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<{ access_token: string }> {
    return await this.authService.register(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
