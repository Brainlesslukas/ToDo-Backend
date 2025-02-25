import { Module } from '@nestjs/common';
import { MinioBucketService } from './minio-bucket.service';
import { MinioBucketController } from './minio-bucket.controller';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [MinioModule],
  providers: [MinioBucketService],
  controllers: [MinioBucketController],
})
export class MinioBucketModule {}
