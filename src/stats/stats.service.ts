import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../auth/auth.entity';
import { Repository } from 'typeorm';
import { ToDoEntity } from "../todo/todo.entity";

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    @InjectRepository(ToDoEntity)
    private readonly toDoEntityRepository: Repository<ToDoEntity>,
  ) {}

  async countUsers(): Promise<number> {
    const userCount = await this.authRepository.count();
    return userCount;
  }

  async countTodos(): Promise<number> {
    const todoCount = await this.authRepository.count();
    return todoCount;
  }
}