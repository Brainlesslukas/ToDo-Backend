import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'X8j#Q9v&L7z@T1m$B3k!W5n*',
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.authRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new UnauthorizedException('Login to access this endpoint.');
    }

    return { id: user.id };
  }
}
