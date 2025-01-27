import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToDoService } from './todo.service';
import { ToDoEntity } from './todo.entity';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get()
  @UseGuards(AuthGuard())
  HelloWorld(): string {
    return this.toDoService.HelloWorld();
  }

  @Post('create')
  @UseGuards(AuthGuard())
  async CreateToDo(
    @Body('todo_title') todo_title: string,
    @Body('todo_description') todo_description: string,
    @Body('todo_active') todo_active: boolean,
  ): Promise<ToDoEntity> {
    return await this.toDoService.Create_ToDo(
      todo_title,
      todo_description,
      todo_active,
    );
  }
}
