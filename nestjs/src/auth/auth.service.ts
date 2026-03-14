import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGithubUser(profile: {
    id: string;
    displayName: string;
    emails: { value: string }[];
    photos: { value: string }[];
  }): Promise<User> {
    const [firstName, ...rest] = (profile.displayName || profile.id).split(' ');
    return this.usersService.upsertFromGithub({
      githubId: profile.id,
      firstName,
      lastName: rest.join(' '),
      email: profile.emails?.[0]?.value ?? '',
      avatarUrl: profile.photos?.[0]?.value ?? '',
    });
  }

  createToken(user: User): string {
    return this.jwtService.sign({ sub: user.id, githubId: user.githubId, isAdmin: user.isAdmin });
  }

  async getSession(userId: number) {
    return this.usersService.findById(userId);
  }
}
