import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class TokenGuard implements CanActivate {
    private readonly validToken;
    canActivate(context: ExecutionContext): boolean;
}
