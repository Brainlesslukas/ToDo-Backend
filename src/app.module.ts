import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'todo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ToDoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
