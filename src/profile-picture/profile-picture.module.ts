import { Module, Global } from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';
import { MinioModule } from 'nestjs-minio-client';
import process from 'node:process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '../auth/auth.entity'

@Global()
@Module({
  imports: [
    MinioModule.register({
      endPoint: process.env.MINIO_ENDPOINT || 'minioToDo',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || '',
      secretKey: process.env.MINIO_SECRET_KEY || '',
    }),
    TypeOrmModule.forFeature([Auth]),
  ],
  providers: [ProfilePictureService],
  controllers: [ProfilePictureController],
  exports: [ProfilePictureService],
})
export class ProfilePictureModule {}
