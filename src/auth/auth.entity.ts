import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  Generated,
} from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity';

@Entity('Auth')
@Unique(['email'])
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({
    type: 'int',
  })
  @Generated('increment')
  user_number: number;

  @OneToMany(() => ToDoEntity, (todo) => todo.author)
  todos: ToDoEntity[];

  @Column({
    type: 'varchar',
    default: 'http://localhost:9000/profile-picture/Default_ProfilePicture.png'
  })
  profilpicture_url: string;
}
