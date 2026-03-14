import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

interface AuthedRequest extends Request {
  user: any;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github/login')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // Redirected to GitHub by Passport
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@Req() req: AuthedRequest, @Res() res: Response) {
    const token = this.authService.createToken(req.user);
    res.cookie('auth-token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 48 });
    res.redirect('http://localhost:3000');
  }

  @Get('github/logout')
  logout(@Res() res: Response) {
    res.clearCookie('auth-token');
    res.redirect('http://localhost:3000/login');
  }

  @Get('session')
  @UseGuards(AuthGuard('jwt'))
  getSession(@Req() req: AuthedRequest) {
    return req.user;
  }
}
