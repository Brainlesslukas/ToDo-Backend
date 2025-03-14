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
//import * as nodemailer from 'nodemailer';

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
  ],
  controllers: [
    AppController,
    StatsController,
    ToDoController,
    AuthController,
    ProfilController,
  ],
  providers: [
    AppService,
    TokenGuard,
    StatsService,
    //{
    //  provide: 'MAILER_TRANSPORT',
    //  inject: [ConfigService],
    //  useFactory: (configService: ConfigService) => {
    //    return nodemailer.createTransport({
    //      host: configService.get<string>('MAIL_HOST'),
    //      port: configService.get<number>('MAIL_PORT'),
    //      secure: false, // true für SSL (Port 465)
    //      auth: {
    //        user: configService.get<string>('MAIL_USER'),
    //        pass: configService.get<string>('MAIL_PASS'),
    //      },
    //    });
    //  },
    //},
  ],
 // exports: ['MAILER_TRANSPORT'],
})
export class AppModule {}
