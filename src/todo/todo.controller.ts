import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToDoService } from './todo.service';
import { ToDoEntity } from './todo.entity';
import { Request } from 'express';
import { User } from '../auth/user.interface';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  HelloWorld(): string {
    return this.toDoService.HelloWorld();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async get_ToDo(@Req() req: Request): Promise<ToDoEntity[]> {
    const user = req.user as User;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const userId = user.id;
    return this.toDoService.get_ToDo(userId);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create_ToDo(
    @Body('todo_title') todo_title: string,
    @Body('todo_description') todo_description: string,
    @Req() req: Request,
  ): Promise<ToDoEntity> {
    const user = req.user as User;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    console.log('Benutzer aus JWT:', user);
    console.log('JWT Payload:', req.user);

    const authorId = user.id;
    return await this.toDoService.create_ToDo(
      todo_title,
      todo_description,
      authorId,
    );
  }
}
