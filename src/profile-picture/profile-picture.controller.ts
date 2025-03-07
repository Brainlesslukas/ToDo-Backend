import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../auth/user.interface';

@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getProfilPicture(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const userId = user.id;

    return await this.profilePictureService.getProfilPicture(userId, res);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('File received:', file);
    if (!file) {
      throw new Error('Keine Datei hochgeladen');
    }

    const user = req.user as User;
    const userId = user.id;
    return await this.profilePictureService.uploadProfilePicture(file, userId);
  }
}
