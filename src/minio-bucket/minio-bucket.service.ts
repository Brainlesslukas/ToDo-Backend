import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'node:process';
import * as crypto from 'crypto';

const url = process.env.MINIO_ENDPOINT;
const port = process.env.MINIO_PORT;

@Injectable()
export class MinioBucketService {
  constructor(private readonly minioService: MinioService) {}

  async listAllBuckets(): Promise<any[]> {
    const minioClient = this.minioService.client;
    try {
      return await minioClient.listBuckets();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to list buckets');
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<object> {
    const bucketName = 'test-bucket';

    // Generiere das heutige Datum
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const fileDate = `${day}-${month}-${year}`;
    const fileUUID = crypto.randomUUID();

    const originalName = file.originalname;
    const extname = path.extname(originalName);
    const basename = path.basename(originalName, extname);

    const fileName = `${fileDate}_${fileUUID}_${basename}${extname}`;

    const stream = file.buffer;

    await this.minioService.client.putObject(bucketName, fileName, stream);

    return {
      message: `Die Datei wurde als ${fileName} erfolgreich hochgeladen`,
      status: 'Success',
      url: `Die Datei ist unter ${url}:${port}/${bucketName}/${fileName} erreichbar.`,
    };
  }
}
