import { Injectable, NotFoundException } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Express, Response } from 'express';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users_data } from '../auth/auth.entity';
import { profil_picture_data } from './profile-picture.entity';
import process from 'node:process';


const url = process.env.MINIO_ENDPOINT;
const port = process.env.MINIO_PORT;

@Injectable()
export class ProfilePictureService {
  constructor(
    private readonly minioService: MinioService,

    @InjectRepository(users_data)
    private readonly users_dataRepository: Repository<users_data>,

    @InjectRepository(profil_picture_data)
    private readonly profil_picture_dataRepository: Repository<profil_picture_data>,
  ) {}

  async getProfilPicture(userId: string, res: Response) {
    const user = await this.users_dataRepository.findOne({
      where: { id: userId },
      relations: ['profilPicture'],
    });

    if (!user || !user.profilPicture) {
      throw new NotFoundException('Profilbild nicht gefunden');
    }

    const filePath = user.profilPicture.profilpicture_url
      .split('/')
      .slice(-1)[0];
    const bucketName = 'profile-picture';

    try {
      const objectStream = await this.minioService.client.getObject(
        bucketName,
        filePath,
      );

      res.setHeader('Content-Type', 'image/jpeg');
      objectStream.pipe(res);
    } catch (error) {
      console.error('Fehler beim Abrufen des Bildes:', error);
      throw new NotFoundException('Fehler beim Abrufen des Bildes');
    }
  }

  async uploadProfilePicture(
    file: Express.Multer.File,
    userId: string,
  ): Promise<object> {
    console.log('User ID:', userId);
    const bucketName = 'profile-picture';

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const fileDate = `${day}-${month}-${year}`;

    const originalName = file.originalname;
    const extname = path.extname(originalName);
    const fileName = `${userId}_${fileDate}${extname}`;
    const ProfilPictureUrl = `http://localhost:9000/${bucketName}/${fileName}`;

    const user = await this.users_dataRepository.findOne({
      where: { id: userId },
      relations: ['profilPicture'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const profilePicture =
      user.profilPicture ||
      this.profil_picture_dataRepository.create({
        user: user,
      });

    profilePicture.profilpicture_url = ProfilPictureUrl;

    await this.profil_picture_dataRepository.save(profilePicture);

    await this.minioService.client.putObject(bucketName, fileName, file.buffer);

    return {
      message: `Die Datei wurde als ${fileName} erfolgreich hochgeladen und gespeichert!`,
      status: 'Success',
      url: `${url}:${port}/${bucketName}/${fileName}`,
    };
  }
}
