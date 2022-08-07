import { Controller, Post, Body, HttpCode, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('signup')
  @HttpCode(204)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Request() req) {
    return this.authService.refresh(req.body.refreshToken);
  }
}
