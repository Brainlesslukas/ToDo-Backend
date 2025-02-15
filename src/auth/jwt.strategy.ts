import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret-key',
    });

    console.log('JWT Secret:', process.env.JWT_SECRET);
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;

    const user = await this.authRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Login to access this endpoint.');
    }

    return { id: user.id };
  }
}
