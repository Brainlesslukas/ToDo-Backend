import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';

@Controller('files')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const bucket = 'test-bucket';
    const fileName = await this.minioService.uploadFile(bucket, file);
    return { fileName };
  }

  @Get('url')
  async getFileUrl(@Query('fileName') fileName: string) {
    const bucket = 'test-bucket';
    const url = await this.minioService.getFileUrl(bucket, fileName);
    return { url };
  }
}
