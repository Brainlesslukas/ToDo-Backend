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

  /*
  async update_ToDo(
    id: number,
    todo_title: string,
    todo_description: string,
  ): Promise<void> {
    await this.toDoRepository.update(id, {
      todo_title,
      todo_description,
    });
  }
   */

  async get_ToDo(authorId: number): Promise<ToDoEntity[]> {
    return this.toDoRepository.find({
      where: { authorId },
    });
  }
}
