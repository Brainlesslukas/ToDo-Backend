import { Module } from '@nestjs/common';
import { Auth } from '../auth/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoController } from './todo.controller';
import { ToDoService } from './todo.service';
import { AuthModule } from '../auth/auth.module';
import { ToDoEntity } from './todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    TypeOrmModule.forFeature([ToDoEntity]),
    AuthModule,
  ],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
