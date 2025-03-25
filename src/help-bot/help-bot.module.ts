import { Module } from '@nestjs/common';
import { HelpBotService } from './help-bot.service';

@Module({
  providers: [HelpBotService]
})
export class HelpBotModule {}
