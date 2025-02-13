import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { Auth } from '../auth/auth.entity';

@Entity('todo_data')
export class ToDoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  todo_title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  todo_description: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  todo_active: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_at: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  completed_at: Date | null;

  @Column({
    type: 'int',
  })
  @Generated('increment')
  todo_number: number;

  @ManyToOne(() => Auth, (auth) => auth.todos)
  @JoinColumn({ name: 'authorId' })
  author: Auth;

  @Column()
  authorId: string;
}
