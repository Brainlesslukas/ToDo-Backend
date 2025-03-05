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
import { User } from '../auth/user.interface';

@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getProfilePicture(@Req() req: Request) {
    const user = req.user as User;
    const userId = user.id;
    return this.profilePictureService.getProfilePicture(userId);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user as User;
    const userId = user.id;

    if (!userId) {
      throw new Error('User ID not found');
    }

    return await this.profilePictureService.uploadProfilePicture(file, userId);
  }
}
