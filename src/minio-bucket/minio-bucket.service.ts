import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class MinioBucketService {
  constructor(private readonly minioService: MinioService) {}

  async listAllBuckets() {
    const minioClient = this.minioService.client;
    return minioClient.listBuckets();
  }
}
