import { Controller, Get } from '@nestjs/common';
import { HelpBotService } from './help-bot.service';

@Controller('help-bot')
export class HelpBotController {
  constructor(private readonly helpBotService: HelpBotService) {}

  @Get('test')
  async test(): Promise<object> {
    return this.helpBotService.test();
  }

  @Get('generate-text')
  async generateText(): Promise<object> {
    return { text: await this.helpBotService.generateText() };
  }
}
