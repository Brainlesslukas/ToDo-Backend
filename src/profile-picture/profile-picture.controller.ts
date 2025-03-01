import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  hello(): object {
    return this.profilePictureService.hello();
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.auth?.id;

    if (!userId) {
      throw new Error('User ID not found');
    }

    const result = await this.profilePictureService.uploadProfilePicture(
      file,
      userId,
    );
    return result;
  }
}
