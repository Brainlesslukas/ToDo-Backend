import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoModule } from './todo/todo.module';
import { StatsController } from './stats/stats.controller';
import { TokenGuard } from './stats/stats.guard';
import { StatsService } from './stats/stats.service';
import { StatsModule } from './stats/stats.module';
import { HttpModule } from '@nestjs/axios';
import * as process from 'node:process';

const user = process.env.POSTGRES_USER!;
const password = process.env.POSTGRES_PASSWORD!;
const db = process.env.POSTGRES_DB!;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: user,
      password: password,
      database: db,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ToDoModule,
    StatsModule,
    HttpModule,
  ],
  controllers: [AppController, StatsController],
  providers: [AppService, TokenGuard, StatsService],
})
export class AppModule {}
