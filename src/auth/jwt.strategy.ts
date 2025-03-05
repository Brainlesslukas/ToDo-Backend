import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { users_data } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import * as process from 'node:process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(users_data)
    private users_dataRepository: Repository<users_data>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret-key',
    });

    console.log('JWT Secret:', process.env.JWT_SECRET);
    console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;

    const user = await this.users_dataRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Login to access this endpoint.');
    }

    return { id: user.id };
  }
}
