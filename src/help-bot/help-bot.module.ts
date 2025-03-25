import { Module } from '@nestjs/common';
import { HelpBotService } from './help-bot.service';
import { HelpBotController } from './help-bot.controller';

@Module({
  providers: [HelpBotService],
  controllers: [HelpBotController],
  exports: [HelpBotService],
})
export class HelpBotModule {}
