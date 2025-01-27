import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
}
