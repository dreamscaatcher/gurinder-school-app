import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Course | null> {
    return this.coursesService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: Partial<Course>): Promise<Course> {
    return this.coursesService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Course>): Promise<Course> {
    return this.coursesService.update(id, body);
  }
}
