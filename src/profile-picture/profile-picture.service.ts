import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Express } from 'express';
import * as fs from 'fs';
import path from 'path';
import * as process from 'node:process';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth/auth.entity';

const url = process.env.MINIO_ENDPOINT;
const port = process.env.MINIO_PORT;

@Injectable()
export class ProfilePictureService {
  constructor(
    private readonly minioService: MinioService,

    @InjectRepository(Auth)
    private readonly AuthRepository: Repository<Auth>,
  ) {}

  hello(): object {
    return {
      status: 'OK',
    };
  }

  async uploadProfilePicture(
    file: Express.Multer.File,
    userId: number,
  ): Promise<object> {
    const bucketName = 'profile-picture';

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const fileDate = `${day}-${month}-${year}`;

    const originalName = file.originalname;
    const extname = path.extname(originalName);
    const basename = path.basename(originalName, extname);

    const fileName = `${fileDate}_${basename}${extname}`;

    const stream = file.buffer;

    const ProfilePictureUrl = `http://localhost:9000/${bucketName}/${fileName}`;

    const newProfilePicture = this.AuthRepository.update(userId, {
      profilpicture_url: ProfilePictureUrl,
    });

    await this.minioService.client.putObject(bucketName, fileName, stream);

    return {
      message: `Die Datei wurde als ${fileName} erfolgreich hochgeladen und in der Datenbank (Minio und Postgres) gesichert!`,
      status: 'Success',
      url: `Die Datei ist unter ${url}:${port}/${bucketName}/${fileName} erreichbar.`,
    };
  }
}
