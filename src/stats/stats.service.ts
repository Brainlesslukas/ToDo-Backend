import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../auth/auth.entity';
import { Repository } from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as process from 'node:process';

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
    return this.authRepository.count();
  }

  async countTodos(): Promise<number> {
    return this.toDoEntityRepository.count();
  }

  async portainerUptime() {
    try {
      const Portainer_Secret = process.env.PORTAINER_SECRET!;
      const Portainer_Container_ID = process.env.PORTAINER_CONTAINER_ID!;

      const portainerResponse = await lastValueFrom(
        this.httpService.get(
          `https://portainer.brainlesslukas.xyz/api/endpoints/2/docker/containers/${Portainer_Container_ID}/json`,
          {
            headers: {
              'x-api-Key': Portainer_Secret,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      const state = portainerResponse.data.State;
      const uptimeDate = new Date(portainerResponse.data.State.StartedAt);
      const currentDate = new Date();

      const uptimeMilliseconds = currentDate.getTime() - uptimeDate.getTime();
      const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
      const uptimeMinutes = Math.floor(uptimeSeconds / 60);
      const uptimeHours = Math.floor(uptimeMinutes / 60);
      const uptimeDays = Math.floor(uptimeHours / 24);

      const uptimeFormatted = {
        days: uptimeDays,
        hours: uptimeHours % 24,
        minutes: uptimeMinutes % 60,
        seconds: uptimeSeconds % 60,
      };

      if (state.Running) {
        return { statusFrontend: 'Online', uptime: uptimeFormatted };
      } else {
        return { statusFrontend: 'Offline' };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching Portainer uptime:', error.message);
        return { error: 'Failed to fetch uptime', details: error.message };
      } else {
        console.error('Unexpected error:', error);
        return { error: 'Unexpected error occurred' };
      }
    }
  }
}
