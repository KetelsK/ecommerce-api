import { Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService) { }

  @Post('login')
  async login(@Request() req): Promise<{ access_token: string }> {
    // Check that credentials are valid
    if (await this.authService.checkCredentials(req.body)) {
      return this.authService.login(req.body);
    }
    throw new UnauthorizedException('Identifiants invalides');
  }

  @Post('register')
  async register(@Request() req): Promise<{ access_token: string }> {
    try {
      return await this.authService.register(req.body);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
