import { Module } from '@nestjs/common';
import { users_data } from '../auth/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoController } from './todo.controller';
import { ToDoService } from './todo.service';
import { AuthModule } from '../auth/auth.module';
import { ToDoEntity } from './todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([users_data]),
    TypeOrmModule.forFeature([ToDoEntity]),
    AuthModule,
  ],
  controllers: [ToDoController],
  providers: [ToDoService],
  exports: [TypeOrmModule, ToDoService],
})
export class ToDoModule {}
