import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity'; // Korrekt importieren

@Entity('Auth')
@Unique(['email'])
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;

  @OneToMany(() => ToDoEntity, (todo) => todo.author)
  todos: ToDoEntity[];
}
