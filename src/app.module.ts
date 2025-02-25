import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ToDoModule } from './todo/todo.module';
import { StatsModule } from './stats/stats.module';
import { StatsController } from './stats/stats.controller';
import { TokenGuard } from './stats/stats.guard';
import { StatsService } from './stats/stats.service';
import { ToDoController } from './todo/todo.controller';
import { AuthController } from './auth/auth.controller';
import { MinioModule } from 'nestjs-minio-client';
import { MinioBucketService } from './minio-bucket/minio-bucket.service';
import { MinioBucketModule } from './minio-bucket/minio-bucket.module';

@Module({
  imports: [
    MinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'admin',
      secretKey: 'admin123',
    }),
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
    MinioBucketModule,
  ],
  controllers: [AppController, StatsController, ToDoController, AuthController],
  providers: [AppService, TokenGuard, StatsService, MinioBucketService],
})
export class AppModule {}
