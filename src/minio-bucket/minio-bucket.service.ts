import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

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
}
