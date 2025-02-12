import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../auth/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async countUsers(): Promise<Auth | null> {
    return this.authRepository.findOne({
      order: { user_number: 'DESC' },
    });
  }
}
