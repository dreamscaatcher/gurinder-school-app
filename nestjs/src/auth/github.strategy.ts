import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.get('GITHUB_CLIENT_ID', 'dummy'),
      clientSecret: config.get('GITHUB_CLIENT_SECRET', 'dummy'),
      callbackURL: config.get('GITHUB_CALLBACK_URL', 'http://localhost:3002/auth/github/callback'),
      scope: ['user:email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    return this.authService.validateGithubUser(profile);
  }
}
