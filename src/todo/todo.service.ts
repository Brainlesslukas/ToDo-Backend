import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private readonly toDoRepository: Repository<ToDoEntity>,
  ) {}
  HelloWorld(): string {
    return 'Hello World!';
  }

  Create_ToDo(
    todo_title: string,
    todo_description: string,
    todo_active: boolean,
  ): Promise<ToDoEntity> {
    const newToDo = this.toDoRepository.create({
      todo_title,
      todo_description,
      todo_active,
    });
    return this.toDoRepository.save(newToDo);
  }
}
