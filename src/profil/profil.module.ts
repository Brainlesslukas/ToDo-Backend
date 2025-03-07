import { Module } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';
import { users_data } from '../auth/auth.entity';
import { profil_picture_data } from '../profile-picture/profile-picture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProfilService],
  controllers: [ProfilController],
  imports: [
    TypeOrmModule.forFeature([users_data]),
    TypeOrmModule.forFeature([profil_picture_data]),
  ],
  exports: [ProfilService],
})
export class ProfilModule {}
