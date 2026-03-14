import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly repo: Repository<Course>) {}

  findAll(): Promise<Course[]> {
    return this.repo.find({ order: { startDate: 'DESC' } });
  }

  findById(id: number): Promise<Course | null> {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Course>): Promise<Course> {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Course>): Promise<Course> {
    await this.repo.update(id, data);
    return this.repo.findOneByOrFail({ id });
  }
}
