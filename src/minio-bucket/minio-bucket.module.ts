import { Module, Global } from '@nestjs/common';
import { MinioBucketService } from './minio-bucket.service';
import { MinioBucketController } from './minio-bucket.controller';
import { MinioModule } from 'nestjs-minio-client';
import * as process from "node:process";

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
  ],
  providers: [MinioBucketService],
  controllers: [MinioBucketController],
  exports: [MinioBucketService],
})
export class MinioBucketModule {}
