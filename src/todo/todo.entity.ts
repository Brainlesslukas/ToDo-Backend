import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todo_data')
export class ToDoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
