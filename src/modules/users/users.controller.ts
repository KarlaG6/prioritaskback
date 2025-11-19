import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';


@Controller('users')
export class UserController {
  constructor(private readonly users: UserService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.users.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.users.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: any) {
    return this.users.profile(req.user.sub);
  }
}
