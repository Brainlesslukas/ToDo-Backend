
import { Controller, Get } from '@nestjs/common';
import { MinioBucketService } from './minio-bucket.service';

@Controller('minio-bucket')
export class MinioBucketController {
  constructor(private readonly minioBucketService: MinioBucketService) {}

  @Get()
  async listAllBuckets():Promise<any[]> {
    return this.minioBucketService.listAllBuckets();
  }
}
