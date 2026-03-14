import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['auth-token'],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET', 'change-me-in-production'),
    });
  }

  async validate(payload: { sub: number; githubId: string; isAdmin: boolean }) {
    return { id: payload.sub, githubId: payload.githubId, isAdmin: payload.isAdmin };
  }
}
