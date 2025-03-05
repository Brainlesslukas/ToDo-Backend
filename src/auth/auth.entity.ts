import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { ToDoEntity } from '../todo/todo.entity';
import { profil_picture_data } from '../profile-picture/profile-picture.entity';

@Entity('users_data')
@Unique(['email'])
export class users_data extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'int' })
  @Generated('increment')
  user_number: number;

  @OneToMany(() => ToDoEntity, (todo) => todo.author)
  todos: ToDoEntity[];

  @OneToOne(() => profil_picture_data, {})
  @JoinColumn({ name: 'profil_picture_id' })
  profilPicture: profil_picture_data;
}
