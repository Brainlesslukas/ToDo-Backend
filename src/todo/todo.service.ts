import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from './todo.entity';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly toDoRepository: Repository<ToDoEntity>,
  ) {}

  HelloWorld(): string {
    return 'Hello, authenticated user!';
  }

  async create_ToDo(
    todo_title: string,
    todo_description: string,
    authorId: number,
  ): Promise<ToDoEntity> {
    const newToDo = this.toDoRepository.create({
      todo_title,
      todo_description,
      authorId,
    });
    return this.toDoRepository.save(newToDo);
  }

  async update_ToDo(
    id: number,
    todo_title: string,
    todo_description: string,
    todo_active: boolean,
  ): Promise<void> {
    await this.toDoRepository.update(id, {
      todo_title,
      todo_description,
      todo_active,
    });
  }

  async get_ToDo(): Promise<ToDoEntity[]> {
    return this.toDoRepository.find();
  }
}
