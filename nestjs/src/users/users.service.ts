import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  findByGithubId(githubId: string): Promise<User | null> {
    return this.repo.findOneBy({ githubId });
  }

  async upsertFromGithub(profile: {
    githubId: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
  }): Promise<User> {
    let user = await this.findByGithubId(profile.githubId);
    if (!user) {
      user = this.repo.create(profile);
    } else {
      Object.assign(user, profile);
    }
    return this.repo.save(user);
  }
}
