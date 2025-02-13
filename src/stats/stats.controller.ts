import { Controller, UseGuards, Get } from '@nestjs/common';
import { TokenGuard } from './stats.guard';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('test')
  @UseGuards(TokenGuard)
  TestStatsController() {
    return {
      message:
        'Hello Admin, welcome to the Stats route! The route is working fine.',
    };
  }

  @Get('count-users')
  @UseGuards(TokenGuard)
  async countUsers() {
    return this.statsService.countUsers();
  }

  @Get('count-todos')
  @UseGuards(TokenGuard)
  async countTodos() {
    return this.statsService.countTodos();
  }

  @Get('portainer-uptime')
  @UseGuards(TokenGuard)
  async portainerUptime() {
    return this.statsService.portainerUptime();
  }
}
