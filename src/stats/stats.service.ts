import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../auth/auth.entity';
import { Repository } from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    @InjectRepository(ToDoEntity)
    private readonly toDoEntityRepository: Repository<ToDoEntity>,

    private readonly httpService: HttpService,
  ) {}

  async countUsers(): Promise<number> {
    const userCount = await this.authRepository.count();
    return userCount;
  }

  async countTodos(): Promise<number> {
    const todoCount = await this.toDoEntityRepository.count();
    return todoCount;
  }

  async portainerUptime() {
    const resonse = await lastValueFrom(
      this.httpService.get('https://api.brainlesslukas.xyz'),
    );
    return resonse.data;
  }
}
