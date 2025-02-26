import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MinioBucketService } from './minio-bucket.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('minio-bucket')
export class MinioBucketController {
  constructor(private readonly minioBucketService: MinioBucketService) {}

  @Get()
  async listAllBuckets(): Promise<any[]> {
    return this.minioBucketService.listAllBuckets();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.minioBucketService.uploadFile(file);
    return result;
  }
}
