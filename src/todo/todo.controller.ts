import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ToDoService } from './todo.service';
import { ToDoEntity } from './todo.entity';
import { Request } from 'express';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get('test')
  @UseGuards(AuthGuard())
  HelloWorld(): string {
    return this.toDoService.HelloWorld();
  }

  @Get()
  @UseGuards(AuthGuard())
  async get_ToDo(): Promise<ToDoEntity[]> {
    return this.toDoService.get_ToDo();
  }

  @Post('create')
  @UseGuards(AuthGuard())
  async create_ToDo(
    @Body('todo_title') todo_title: string,
    @Body('todo_description') todo_description: string,
    @Req() req: Request,
  ): Promise<ToDoEntity> {
    const user = req.user;
    const authorId = user['id'];
    return await this.toDoService.create_ToDo(
      todo_title,
      todo_description,
      authorId,
    );
  }

  @Put('update/:id')
  @UseGuards(AuthGuard())
  async update_ToDo(
    @Param('id') id: number,
    @Body()
    body: {
      todo_title: string;
      todo_description: string;
      todo_active: boolean;
    },
  ) {
    await this.toDoService.update_ToDo(
      id,
      body.todo_title,
      body.todo_description,
      body.todo_active,
    );
    return { message: 'Successfully updated ToDo!' };
  }
}
