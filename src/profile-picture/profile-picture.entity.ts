import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { users_data } from '../auth/auth.entity';

@Entity('profil_picture_data')
export class profil_picture_data extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: 'http://localhost:9000/profile-picture/Default_ProfilePicture.png',
  })
  profilpicture_url: string;

  @OneToOne(() => users_data, (user) => user.profilPicture, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: users_data;
}
