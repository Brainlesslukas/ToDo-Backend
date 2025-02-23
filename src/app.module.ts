import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Client } from 'minio';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ToDoModule } from './todo/todo.module';
import { StatsModule } from './stats/stats.module';
import { StatsController } from './stats/stats.controller';
import { TokenGuard } from './stats/stats.guard';
import { StatsService } from './stats/stats.service';
import { MinioService } from './minio/minio.service';
import { ToDoController } from './todo/todo.controller';
import { AuthController } from './auth/auth.controller';
import { MinioController } from './minio/minio.controller';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ToDoModule,
    StatsModule,
    HttpModule,
    MinioModule,
  ],
  controllers: [AppController, StatsController, ToDoController, AuthController, MinioController],
  providers: [
    AppService,
    TokenGuard,
    StatsService,
    {
      provide: 'MINIO_CLIENT',
      useFactory: () => {
        return new Client({
          endPoint: 'localhost',
          port: 9000,
          useSSL: false,
          accessKey: process.env.MINIO_ACCESS_KEY,
          secretKey: process.env.MINIO_SECRET_KEY,
        });
      },
    },
    MinioService,
  ],
  exports: ['MINIO_CLIENT'],
})
export class AppModule {}
