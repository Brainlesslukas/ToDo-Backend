import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'X8j#Q9v&L7z@T1m$B3k!W5n*',
      signOptions: {
        expiresIn: '3d',
      },
    }),
  ],
})
export class AuthModule {}
