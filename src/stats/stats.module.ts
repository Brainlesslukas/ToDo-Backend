import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/auth.entity';
import { AuthModule } from '../auth/auth.module';

console.log('📌 StatsModule wird geladen');
console.log('📌 Auth Entity geladen:', Auth);

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), AuthModule],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
