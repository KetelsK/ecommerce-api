import { Body, Controller, Get, Post, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt.strategy';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService) { }



  @Post('login')
  async login(@Body() user: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<{ access_token: string }> {
    if (await this.authService.checkCredentials(user)) {
      return { access_token: this.assignTokenToCookie(user, res) };
    }
    throw new UnauthorizedException('Identifiants invalides');
  }

  @Post('register')
  async register(@Body() user: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<{ access_token: string }> {
    this.assignTokenToCookie(user, res);
    return await this.authService.register(user);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logged out' };
  }



  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  private assignTokenToCookie(user: CreateUserDto, res: Response) {
    const { access_token } = this.authService.login(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false,     // true en prod (https)
      sameSite: 'strict',
    });
    return access_token;
  }
}
