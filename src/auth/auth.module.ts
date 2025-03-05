import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users_data } from './auth.entity';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { profil_picture_data } from '../profile-picture/profile-picture.entity';

@Module({
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService, TypeOrmModule],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([users_data]),
    TypeOrmModule.forFeature([profil_picture_data]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '3d',
      },
    }),
  ],
})
export class AuthModule {}
