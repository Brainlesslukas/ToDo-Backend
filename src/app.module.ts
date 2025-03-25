import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { MinioBucketModule } from './minio-bucket/minio-bucket.module';
import { ProfilePictureModule } from './profile-picture/profile-picture.module';
import { ProfilController } from './profil/profil.controller';
import { ProfilModule } from './profil/profil.module';
import { HelpBotController } from './help-bot/help-bot.controller';
import { HelpBotModule } from './help-bot/help-bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
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
    ProfilePictureModule,
    ProfilModule,
    HelpBotModule,
  ],
  controllers: [
    AppController,
    StatsController,
    ToDoController,
    AuthController,
    ProfilController,
    HelpBotController,
  ],
  providers: [
    AppService,
    TokenGuard,
    StatsService,
  ],
})
export class AppModule {}
