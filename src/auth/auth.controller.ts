import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
