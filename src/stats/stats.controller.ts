import { Controller, UseGuards, Get } from '@nestjs/common';
import { TokenGuard } from './stats.guard';

@Controller('stats')
export class StatsController {
  @Get('test')
  @UseGuards(TokenGuard)
  TestStatsController() {
    return { message: 'Hello Admin, welcome to the Stats route! The route is working fine.' };
  }
}
