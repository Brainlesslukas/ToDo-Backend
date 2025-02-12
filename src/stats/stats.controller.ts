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

  @Get('count-user')
  @UseGuards(TokenGuard)
  async countUsers() {
    return this.statsService.countUsers();
  }
}
