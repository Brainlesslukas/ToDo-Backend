import { Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../auth/user.interface';

@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async profilInfo(@Req() req: Request) {
    const user = req.user as User;
    const userId = user.id;
    return this.profilService.profilInfo(userId);
  }

  @Get('test')
  async test() {
    return this.profilService.test();
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteAccount(@Req() req: Request) {
    const user = req.user as User;
    const userId = user.id;
    return this.profilService.deleteAccount(userId);
  }
}