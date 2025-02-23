import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  constructor(@Inject('MINIO_CLIENT') private readonly minioClient: Client) {}

  async uploadFile(bucket: string, file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const fileStream = Readable.from(file.buffer);

    await this.minioClient.putObject(bucket, fileName, fileStream, file.size, {
      'Content-Type': file.mimetype,
    });

    return fileName;
  }

  async getFileUrl(bucket: string, fileName: string): Promise<string> {
    return await this.minioClient.presignedUrl(
      'GET',
      bucket,
      fileName,
      24 * 60 * 60,
    );
  }
}
