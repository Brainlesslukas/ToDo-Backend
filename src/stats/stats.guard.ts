import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  private readonly validToken = process.env.ADMIN_PASSWORD;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${this.validToken}`) {
      throw new UnauthorizedException('Please enter a valid password.');
    }

    return true;
  }
}
