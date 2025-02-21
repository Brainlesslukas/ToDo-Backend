import { Controller, UseGuards, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('test')
  TestStatsController() {
    return {
      message:
        'Hello Admin, welcome to the Stats route! The route is working fine.',
    };
  }

  @Get('count-users')
  async countUsers() {
    return this.statsService.countUsers();
  }

  @Get('count-todos')
  async countTodos() {
    return this.statsService.countTodos();
  }

  @Get('portainer-uptime')
  async portainerUptime() {
    return this.statsService.portainerUptime();
  }
}